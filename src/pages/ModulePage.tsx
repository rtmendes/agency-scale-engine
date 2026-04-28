import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MODULES } from "../lib/courseData";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useCallback } from "react";

export function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const moduleId = Number(id);
  const mod = MODULES.find(m => m.id === moduleId);
  
  const progress = useQuery(api.progress.getModule, { moduleId });
  const workbookAnswers = useQuery(api.workbook.getAnswers, { moduleId });
  const promptResults = useQuery(api.prompts.getResults, { moduleId });
  
  const toggleChecklistItem = useMutation(api.progress.toggleChecklistItem);
  const saveAnswer = useMutation(api.workbook.saveAnswer);

  if (!mod) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
        <Button asChild><Link to="/dashboard">← Back to Dashboard</Link></Button>
      </div>
    );
  }

  const prevModule = MODULES.find(m => m.id === moduleId - 1);
  const nextModule = MODULES.find(m => m.id === moduleId + 1);

  const handleChecklistToggle = async (itemId: string) => {
    await toggleChecklistItem({ moduleId, itemId });
  };

  const handleSaveAnswer = useCallback(async (questionId: string, answer: string) => {
    await saveAnswer({ moduleId, questionId, answer });
  }, [moduleId, saveAnswer]);

  const getAnswer = (questionId: string): string => {
    return workbookAnswers?.find((a: { questionId: string; answer: string }) => a.questionId === questionId)?.answer ?? "";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <span className="text-4xl">{mod.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">Module {mod.id}</Badge>
            <Badge variant="secondary">{mod.duration}</Badge>
          </div>
          <h1 className="text-2xl font-bold">{mod.title}</h1>
          <p className="text-muted-foreground">{mod.subtitle}</p>
        </div>
      </div>

      <p className="text-muted-foreground">{mod.description}</p>

      {/* Tabs */}
      <Tabs defaultValue="frameworks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="workbook">Workbook</TabsTrigger>
          <TabsTrigger value="agent">AI Agent</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        {/* Frameworks Tab */}
        <TabsContent value="frameworks" className="space-y-4 mt-6">
          {mod.frameworks.map((fw, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg">{fw.name}</CardTitle>
                <CardDescription>{fw.description}</CardDescription>
              </CardHeader>
              {fw.steps && (
                <CardContent>
                  <ol className="space-y-2">
                    {fw.steps.map((step, si) => (
                      <li key={si} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                          {si + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              )}
            </Card>
          ))}

          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📄 Templates Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mod.templates.map(t => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workbook Tab */}
        <TabsContent value="workbook" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">✏️ Module {mod.id} Exercises</CardTitle>
              <CardDescription>Complete these exercises to apply the frameworks to your agency.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mod.exercises.map((ex) => (
                <div key={ex.id} className="space-y-2">
                  <label className="text-sm font-medium">{ex.question}</label>
                  {ex.type === "textarea" ? (
                    <Textarea
                      placeholder={ex.placeholder}
                      defaultValue={getAnswer(ex.id)}
                      onBlur={(e) => handleSaveAnswer(ex.id, e.target.value)}
                      className="min-h-[120px]"
                    />
                  ) : (
                    <Input
                      placeholder={ex.placeholder}
                      defaultValue={getAnswer(ex.id)}
                      onBlur={(e) => handleSaveAnswer(ex.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Agent Tab */}
        <TabsContent value="agent" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <CardTitle className="text-lg">{mod.aiAgent.name}</CardTitle>
                  <CardDescription>{mod.aiAgent.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
                <ul className="space-y-1">
                  {mod.aiAgent.capabilities.map(c => (
                    <li key={c} className="text-sm text-muted-foreground">• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">📋 Sample Prompt (copy & customize):</h4>
                <p className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{mod.aiAgent.samplePrompt}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => navigator.clipboard.writeText(mod.aiAgent.samplePrompt)}
                >
                  Copy Prompt
                </Button>
              </div>

              {/* Saved results */}
              {promptResults && promptResults.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Previous Results:</h4>
                  {promptResults.map((r: { input: string; output: string }, i: number) => (
                    <Card key={i} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <p className="text-xs text-muted-foreground mb-2">Input: {r.input.substring(0, 100)}...</p>
                        <p className="text-sm whitespace-pre-wrap">{r.output.substring(0, 500)}{r.output.length > 500 ? "..." : ""}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">✅ Module {mod.id} Checklist</CardTitle>
              <CardDescription>Track your completion of this module's key activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mod.checklistItems.map((item) => {
                  const isChecked = progress?.checklistItems.find((p: { id: string; completed: boolean }) => p.id === item.id)?.completed ?? false;
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <Checkbox 
                        checked={isChecked}
                        onCheckedChange={() => handleChecklistToggle(item.id)}
                      />
                      <span className={`text-sm ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        {prevModule ? (
          <Button asChild variant="outline">
            <Link to={`/module/${prevModule.id}`}>← Module {prevModule.id}: {prevModule.title}</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/dashboard">← Dashboard</Link>
          </Button>
        )}
        {nextModule ? (
          <Button asChild>
            <Link to={`/module/${nextModule.id}`}>Module {nextModule.id}: {nextModule.title} →</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/prompts">View All AI Agents →</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
