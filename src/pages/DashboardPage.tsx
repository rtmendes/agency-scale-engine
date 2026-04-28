import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MODULES, COURSE_TITLE } from "../lib/courseData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

export function DashboardPage() {
  const allProgress = useQuery(api.progress.getAll);
  
  const getModuleProgress = (moduleId: number) => {
    const prog = allProgress?.find(p => p.moduleId === moduleId);
    if (!prog) return 0;
    const completed = prog.checklistItems.filter(c => c.completed).length;
    return Math.round((completed / prog.checklistItems.length) * 100);
  };

  const overallProgress = MODULES.reduce((acc, m) => acc + getModuleProgress(m.id), 0) / MODULES.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{COURSE_TITLE}</h1>
        <p className="text-muted-foreground mt-1">Your agency transformation dashboard</p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Overall Progress</CardTitle>
          <CardDescription>Complete all 6 modules to build your agency operating system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={overallProgress} className="flex-1" />
            <span className="text-sm font-medium text-muted-foreground w-12">{Math.round(overallProgress)}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {MODULES.filter(m => getModuleProgress(m.id) === 100).length} of {MODULES.length} modules completed
          </p>
        </CardContent>
      </Card>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((mod) => {
          const progress = getModuleProgress(mod.id);
          return (
            <Link key={mod.id} to={`/module/${mod.id}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{mod.icon}</span>
                    <Badge variant={progress === 100 ? "default" : progress > 0 ? "secondary" : "outline"}>
                      {progress === 100 ? "Complete" : progress > 0 ? `${progress}%` : mod.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    Module {mod.id}: {mod.title}
                  </CardTitle>
                  <CardDescription className="text-xs">{mod.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-1.5" />
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {mod.templates.slice(0, 2).map(t => (
                      <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "AI Agents Available", value: "15", icon: "🤖" },
          { label: "Templates Included", value: "30+", icon: "📄" },
          { label: "Exercises", value: `${MODULES.reduce((a, m) => a + m.exercises.length, 0)}`, icon: "✏️" },
          { label: "Total Duration", value: "90 min", icon: "⏱️" },
        ].map(s => (
          <Card key={s.label} className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
