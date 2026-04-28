import { MODULES } from "../lib/courseData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function ResourcesPage() {
  const allTemplates = MODULES.flatMap(m => m.templates.map(t => ({ template: t, module: m.id, icon: m.icon })));
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Resources & Templates</h1>
        <p className="text-muted-foreground mt-1">{allTemplates.length} templates across all modules.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {MODULES.map(mod => (
          <Card key={mod.id}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span>{mod.icon}</span> Module {mod.id}: {mod.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mod.templates.map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{t}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  {mod.frameworks.length} frameworks • {mod.exercises.length} exercises • {mod.checklistItems.length} checklist items
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
