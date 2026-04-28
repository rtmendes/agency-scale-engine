import { MODULES } from "../lib/courseData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function PromptsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">AI Agent Prompt Library</h1>
        <p className="text-muted-foreground mt-1">15 specialized prompts — copy, customize, and execute.</p>
      </div>
      <div className="space-y-6">
        {MODULES.map((mod) => (
          <Card key={mod.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <CardTitle className="text-lg">🤖 {mod.aiAgent.name}</CardTitle>
                  <CardDescription>Module {mod.id} • {mod.aiAgent.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {mod.aiAgent.capabilities.map(c => (
                  <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                ))}
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-mono whitespace-pre-wrap">{mod.aiAgent.samplePrompt}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(mod.aiAgent.samplePrompt)}>
                Copy Prompt
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
