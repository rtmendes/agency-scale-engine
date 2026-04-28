import { Link } from "react-router-dom";
import { MODULES, COURSE_TITLE, COURSE_SUBTITLE, COURSE_TAGLINE, AI_AGENTS } from "../lib/courseData";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <Badge variant="outline" className="mb-6 border-blue-400/40 text-blue-300 px-4 py-1.5 text-sm">
            90-Minute Accelerated Course • 6 Modules • 15 AI Agents
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            {COURSE_TITLE}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
            {COURSE_SUBTITLE}
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            {COURSE_TAGLINE}
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-lg px-8 py-6">
              <Link to="/signup">Start Learning Free →</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "6", label: "Core Modules" },
            { num: "15", label: "AI Agents" },
            { num: "30+", label: "Templates" },
            { num: "90", label: "Minutes Total" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-blue-400">{s.num}</div>
              <div className="text-slate-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">The Curriculum</h2>
        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          Six focused modules that take you from solo operator to scalable machine. Each module includes frameworks, templates, and AI agents.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {MODULES.map((mod) => (
            <Card key={mod.id} className="bg-slate-900/80 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{mod.icon}</span>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                    Module {mod.id} • {mod.duration}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">{mod.title}</CardTitle>
                <CardDescription className="text-slate-400">{mod.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-4">{mod.description}</p>
                <div className="flex flex-wrap gap-2">
                  {mod.templates.slice(0, 3).map(t => (
                    <Badge key={t} variant="outline" className="border-slate-700 text-slate-400 text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Agents */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Your AI Agent Team</h2>
          <p className="text-slate-400 text-center mb-12">15 specialized agents that do the heavy lifting — just paste your data and get actionable output.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {AI_AGENTS.map(a => (
              <Card key={a.name} className="bg-slate-950/60 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-400">{a.name}</CardTitle>
                  <CardDescription className="text-xs text-slate-500">Module {a.moduleId} • {a.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {a.capabilities.slice(0, 2).map(c => (
                      <li key={c} className="text-xs text-slate-400">• {c}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Scale?</h2>
        <p className="text-slate-400 mb-8">
          90 minutes from now, you'll have a complete agency operating system — hiring pipeline, team SOPs, media buying playbook, and lead qualification engine.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-lg px-8 py-6">
          <Link to="/signup">Get Started →</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Agency Scale Engine. Built with AI-powered synthesis.</p>
      </footer>
    </div>
  );
}
