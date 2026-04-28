export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  color: string;
  description: string;
  frameworks: Framework[];
  templates: string[];
  aiAgent: AIAgent;
  exercises: Exercise[];
  checklistItems: ChecklistItem[];
}

export interface Framework {
  name: string;
  description: string;
  steps?: string[];
}

export interface AIAgent {
  name: string;
  role: string;
  capabilities: string[];
  samplePrompt: string;
}

export interface Exercise {
  id: string;
  question: string;
  type: "text" | "textarea" | "checklist";
  placeholder?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export const COURSE_TITLE = "Agency Scale Engine";
export const COURSE_SUBTITLE = "From Solo Operator to 8-Figure Machine in 90 Minutes";
export const COURSE_TAGLINE = "Transform your agency from founder-dependent chaos into a systematized, scalable operation.";

export const MODULES: ModuleData[] = [
  {
    id: 1,
    title: "The Agency Operating System",
    subtitle: "From Chaos to Clockwork — Building Your Scalable Foundation",
    duration: "15 min",
    icon: "🏗️",
    color: "from-blue-500 to-indigo-600",
    description: "Build the foundational operating system that turns your agency from a one-person show into a scalable machine. Map your team, identify gaps, and create your hiring roadmap.",
    frameworks: [
      {
        name: "The Agency Scale Stack",
        description: "Five-layer framework for building a scalable agency",
        steps: ["Hiring Pipeline", "Team Operating System", "Media Buying Machine", "Lead Qualification Engine", "9-Figure Vision"]
      },
      {
        name: "The 6 Critical Hires",
        description: "Senior Media Buyer, Project Manager, Executive Assistant, Video Editor, Operations Manager, Creative Strategist"
      },
      {
        name: "Priority Funnel Method",
        description: "Rank tasks by revenue impact, not urgency — focus on what moves the needle"
      },
      {
        name: "BOD/MOD/EOD Rituals",
        description: "Beginning, Middle, End of Day processes that create accountability without micromanagement"
      }
    ],
    templates: ["Org Chart Template", "Revenue-to-Headcount Calculator", "Hiring Priority Matrix"],
    aiAgent: {
      name: "Agency Architect",
      role: "Org design & hiring roadmap",
      capabilities: ["Analyze current team structure and identify gaps", "Generate custom org chart based on revenue stage", "Create priority-ranked hiring roadmap", "Revenue-stage analysis and recommendations"],
      samplePrompt: "I run a [niche] agency doing $[X]/month with [N] team members. Current roles: [list]. Biggest bottleneck: [describe]. Generate my Agency Scale Stack assessment, identify the top 3 hiring priorities, and create a 90-day hiring roadmap with expected revenue impact."
    },
    exercises: [
      { id: "m1_q1", question: "Map your current team — who does what, and what's missing?", type: "textarea", placeholder: "List each team member, their role, and identify gaps..." },
      { id: "m1_q2", question: "What's your current monthly revenue? What's the target in 12 months?", type: "text", placeholder: "$X/month → $Y/month" },
      { id: "m1_q3", question: "Complete your 90-day hiring priority matrix — rank your next 3 hires by revenue impact.", type: "textarea", placeholder: "Hire 1: [Role] — Revenue impact: $X/month\nHire 2: ..." },
    ],
    checklistItems: [
      { id: "m1_c1", label: "Complete Agency Scale Stack self-assessment" },
      { id: "m1_c2", label: "Map current team and identify gaps" },
      { id: "m1_c3", label: "Calculate revenue-to-headcount ratio" },
      { id: "m1_c4", label: "Create 90-day hiring priority matrix" },
      { id: "m1_c5", label: "Run Agency Architect prompt" },
    ]
  },
  {
    id: 2,
    title: "The A-Player Hiring Machine",
    subtitle: "Scorecards, Assessments & Interview Funnels That Filter for Excellence",
    duration: "15 min",
    icon: "🎯",
    color: "from-emerald-500 to-teal-600",
    description: "Build a repeatable hiring system that attracts and filters A-players. From job descriptions to assessments to scorecards — never make a bad hire again.",
    frameworks: [
      {
        name: "The 5-Stage Hiring Pipeline",
        description: "Systematic approach to hiring excellence",
        steps: ["Outcome-focused Job Description", "Role-specific Assessment Test", "Priority Funnel — Rank by capability tiers", "Focused Interview — Deep-dive questions", "Hiring Scorecard — Quantified decision matrix"]
      },
      {
        name: "Assessment-First Methodology",
        description: "Test before you interview — filter 80% of candidates before spending time on calls"
      }
    ],
    templates: ["Universal Job Description Template (6 roles)", "Assessment Builder", "Hiring Scorecard with weighted criteria", "Interview Question Bank (40+ questions)"],
    aiAgent: {
      name: "Talent Scout",
      role: "JD & assessment creation",
      capabilities: ["Generate custom JDs from role description", "Create role-specific assessment tests", "Score candidate responses automatically", "Produce hiring recommendation reports"],
      samplePrompt: "I need to hire a [role] for my [niche] agency. Key outcomes needed: [list 3-5]. Budget: $[X]/month. Generate: 1) An outcome-focused job description, 2) A 5-question assessment test, 3) A hiring scorecard with weighted criteria, 4) Top 10 interview questions for the final round."
    },
    exercises: [
      { id: "m2_q1", question: "Write an outcome-focused job description for your next hire.", type: "textarea", placeholder: "Role: [title]\nKey Outcomes: 1) ... 2) ... 3) ...\nAssessment criteria: ..." },
      { id: "m2_q2", question: "Build a 5-question assessment for your most critical role.", type: "textarea", placeholder: "Q1: [Skill test]...\nQ2: [Scenario question]..." },
      { id: "m2_q3", question: "Create your hiring scorecard criteria (5 weighted factors).", type: "textarea", placeholder: "Factor 1: [X] — Weight: 30%\nFactor 2: ..." },
    ],
    checklistItems: [
      { id: "m2_c1", label: "Identify your most critical next hire" },
      { id: "m2_c2", label: "Write outcome-focused job description" },
      { id: "m2_c3", label: "Create role-specific assessment test" },
      { id: "m2_c4", label: "Build hiring scorecard with criteria" },
      { id: "m2_c5", label: "Run Talent Scout prompt" },
    ]
  },
  {
    id: 3,
    title: "Team Systems & Daily Operations",
    subtitle: "30-60-90 Day Ramps, BOD/MOD/EOD, and the Outcomes Framework",
    duration: "15 min",
    icon: "⚙️",
    color: "from-orange-500 to-red-600",
    description: "Install the daily operating rhythms that keep your team productive without micromanagement. Build onboarding sequences that get new hires to full productivity in 90 days.",
    frameworks: [
      {
        name: "The Operational Trinity",
        description: "Three daily checkpoints that create accountability",
        steps: ["BOD — Priority alignment, blocker identification, daily targets", "MOD — Progress check, pivot decisions, team syncs", "EOD — Output review, tomorrow's prep, win documentation"]
      },
      {
        name: "The 30-60-90 Day Ramp System",
        description: "Days 1-30: Learn systems → Days 31-60: Execute with guidance → Days 61-90: Own outcomes"
      },
      {
        name: "Outcomes Framework",
        description: "Define success by results, not activity — every role has 3-5 measurable outcomes"
      }
    ],
    templates: ["BOD/MOD/EOD Checklist Templates (6 roles)", "30-60-90 Day Ramp Plans", "Outcomes & KPIs Framework", "Focus Questions for Reviews"],
    aiAgent: {
      name: "Ops Commander",
      role: "SOPs & daily rituals",
      capabilities: ["Generate role-specific onboarding sequences", "Create automated BOD/MOD/EOD check-in templates", "Build KPI dashboards from your metrics", "Flag performance issues before they compound"],
      samplePrompt: "I'm onboarding a new [role] at my [niche] agency. Current team size: [N]. They'll be responsible for: [outcomes]. Create: 1) A complete 30-60-90 day ramp plan with weekly milestones, 2) BOD/MOD/EOD templates for this role, 3) 5 outcome-based KPIs with targets."
    },
    exercises: [
      { id: "m3_q1", question: "Design BOD/MOD/EOD rituals for your most critical role.", type: "textarea", placeholder: "BOD: [alignment tasks]\nMOD: [check-in points]\nEOD: [review & prep]" },
      { id: "m3_q2", question: "Build a 30-60-90 day ramp plan for your next hire.", type: "textarea", placeholder: "Week 1-2: [onboarding tasks]\nWeek 3-4: [supervised execution]..." },
      { id: "m3_q3", question: "Define 5 outcome-based KPIs for your team.", type: "textarea", placeholder: "KPI 1: [metric] — Target: [X]\nKPI 2: ..." },
    ],
    checklistItems: [
      { id: "m3_c1", label: "Design BOD/MOD/EOD for most critical role" },
      { id: "m3_c2", label: "Build 30-60-90 day ramp plan" },
      { id: "m3_c3", label: "Define 5 outcome-based KPIs per role" },
      { id: "m3_c4", label: "Create focus questions for reviews" },
      { id: "m3_c5", label: "Run Ops Commander prompt" },
    ]
  },
  {
    id: 4,
    title: "Media Buying Mastery",
    subtitle: "The Internal SOP Behind $53M+ in Annual Revenue",
    duration: "15 min",
    icon: "📊",
    color: "from-purple-500 to-violet-600",
    description: "Master the media buying operating system that drives 8-figure agency revenue. Campaign architecture, creative testing, scaling rules, and the complete internal SOP.",
    frameworks: [
      {
        name: "The Media Buying Operating System",
        description: "Complete framework for campaign management",
        steps: ["Campaign Architecture — structure, naming, budgets", "Creative Testing Protocol — hooks, body copy, CTAs", "Scaling Rules — when to increase, kill, or duplicate", "Reporting Cadence — daily, weekly, monthly KPIs"]
      },
      {
        name: "The 27-Page Internal SOP (Distilled)",
        description: "Account setup → Audience research → Creative brief → Launch protocol → Optimization tree → Scaling rules → Emergency protocols"
      }
    ],
    templates: ["Campaign Architecture Template", "Creative Testing Calendar", "Optimization Decision Tree", "Budget Scaling Rules", "Emergency Protocol Checklist"],
    aiAgent: {
      name: "Media Buying Analyst",
      role: "Campaign optimization",
      capabilities: ["Analyze campaign performance data", "Recommend scaling/killing decisions", "Generate optimization reports", "Create ad creative briefs from data"],
      samplePrompt: "I'm running [platform] ads for a [niche] client. Current metrics: Spend $[X]/day, CPA $[Y], ROAS [Z]. Top 3 campaigns: [list with metrics]. Generate: 1) A scaling/killing recommendation for each campaign, 2) A creative testing plan for next 2 weeks, 3) An optimization decision tree for this account."
    },
    exercises: [
      { id: "m4_q1", question: "Audit your current campaign structure.", type: "textarea", placeholder: "Campaign 1: [name] — Objective: [X] — Budget: $[Y]/day\n..." },
      { id: "m4_q2", question: "Create a 4-week creative testing calendar.", type: "textarea", placeholder: "Week 1: Test [hook variations]\nWeek 2: Test [body copy]..." },
      { id: "m4_q3", question: "Build your optimization decision tree.", type: "textarea", placeholder: "IF CPA > target by 20%: → Check [X]\nIF ROAS < 1: → [action]..." },
    ],
    checklistItems: [
      { id: "m4_c1", label: "Audit current campaign structure" },
      { id: "m4_c2", label: "Create creative testing calendar" },
      { id: "m4_c3", label: "Build optimization decision tree" },
      { id: "m4_c4", label: "Set up reporting cadence" },
      { id: "m4_c5", label: "Run Media Buying Analyst prompt" },
    ]
  },
  {
    id: 5,
    title: "Ad Scripts That Convert",
    subtitle: "Multi-Niche Script Formulas for Low-Ticket to High-Ticket",
    duration: "15 min",
    icon: "✍️",
    color: "from-pink-500 to-rose-600",
    description: "Master the universal script architecture that works across 7 niches. Hook formulas, body patterns, and CTA strategies proven to convert at scale.",
    frameworks: [
      {
        name: "The Universal Script Architecture",
        description: "Six-part formula that works for any offer",
        steps: ["HOOK (0-3 sec)", "PROBLEM (3-15 sec)", "AGITATE (15-30 sec)", "SOLUTION (30-60 sec)", "PROOF (60-90 sec)", "CTA (90-120 sec)"]
      },
      {
        name: "7 Niche Templates",
        description: "Digital Products (curiosity + quick win), Consulting (authority + pain), Affiliate (lifestyle + proof), Agency (case study + scale), Health (transformation + urgency), Personal Dev (identity shift + fear)"
      }
    ],
    templates: ["Universal Script Template", "Hook Formula Cards (10 patterns)", "Niche Script Variants (7)", "Script Testing Matrix"],
    aiAgent: {
      name: "Script Writer",
      role: "Ad copy generation",
      capabilities: ["Generate niche-specific ad scripts from offer description", "Create 10 hook variations per script", "Adapt scripts across platforms", "Score scripts against conversion frameworks"],
      samplePrompt: "My offer: [describe product/service, price, target audience]. Platform: [Facebook/YouTube/TikTok]. Generate: 1) A full ad script using the universal architecture, 2) 10 hook variations, 3) 3 body copy variants (short, medium, long), 4) Score each variant on the conversion framework."
    },
    exercises: [
      { id: "m5_q1", question: "Write 3 hook variations for your offer using the patterns.", type: "textarea", placeholder: "Hook 1 (Curiosity): ...\nHook 2 (Pain point): ...\nHook 3 (Contrarian): ..." },
      { id: "m5_q2", question: "Complete one full script using the universal architecture.", type: "textarea", placeholder: "HOOK: ...\nPROBLEM: ...\nAGITATE: ...\nSOLUTION: ...\nPROOF: ...\nCTA: ..." },
      { id: "m5_q3", question: "Create a script testing matrix (3 hooks × 2 bodies × 2 CTAs).", type: "textarea", placeholder: "Test 1: Hook A + Body 1 + CTA 1\nTest 2: ..." },
    ],
    checklistItems: [
      { id: "m5_c1", label: "Write 3 hook variations" },
      { id: "m5_c2", label: "Complete full script with universal architecture" },
      { id: "m5_c3", label: "Create script testing matrix" },
      { id: "m5_c4", label: "Adapt script for 2+ platforms" },
      { id: "m5_c5", label: "Run Script Writer prompt" },
    ]
  },
  {
    id: 6,
    title: "Lead Qualification & Scale Engine",
    subtitle: "The Platinum Tier Framework for Tiering, Scoring, and Converting",
    duration: "15 min",
    icon: "🚀",
    color: "from-amber-500 to-yellow-600",
    description: "Install the lead qualification system that transforms your pipeline. Tier leads automatically, route to the right process, and scale predictably.",
    frameworks: [
      {
        name: "Platinum Lead Tier System",
        description: "Four-tier qualification framework",
        steps: ["Platinum — High-intent, high-budget (< 5 min response)", "Gold — Qualified interest (< 1 hour response)", "Silver — Needs nurturing (< 24 hours)", "Bronze — Cold/Unqualified (automated only)"]
      },
      {
        name: "The Scale Engine",
        description: "Acquisition → Qualification → Conversion → Fulfillment → Expansion — systematic growth loop"
      }
    ],
    templates: ["Platinum Tier Definition Card", "Response Protocol Matrix", "Lead Scoring Criteria", "Scale Engine Dashboard"],
    aiAgent: {
      name: "Deal Qualifier",
      role: "Lead tier scoring",
      capabilities: ["Score incoming leads against Platinum Tier criteria", "Auto-route to correct tier workflow", "Generate personalized outreach per tier", "Track conversion rates by tier for optimization"],
      samplePrompt: "My agency serves [niche] clients. Average deal size: $[X]. Current lead sources: [list]. Monthly leads: [N]. Define my platinum tier criteria with specific qualifying questions, response protocols for each tier, and conversion rate targets. Then create personalized outreach templates for Platinum and Gold tiers."
    },
    exercises: [
      { id: "m6_q1", question: "Define your platinum tier criteria.", type: "textarea", placeholder: "Platinum: [budget > $X, timeline < Y days, ...]\nGold: ...\nSilver: ...\nBronze: ..." },
      { id: "m6_q2", question: "Map response protocols per tier.", type: "textarea", placeholder: "Platinum: Personal call within 5 min + [action]\nGold: ..." },
      { id: "m6_q3", question: "Calculate your lead-to-close ratio targets by tier.", type: "textarea", placeholder: "Platinum: [X]% close rate → [Y] deals/month\nGold: ..." },
    ],
    checklistItems: [
      { id: "m6_c1", label: "Define platinum tier criteria" },
      { id: "m6_c2", label: "Map response protocols per tier" },
      { id: "m6_c3", label: "Set up lead scoring system" },
      { id: "m6_c4", label: "Calculate conversion targets by tier" },
      { id: "m6_c5", label: "Run Deal Qualifier prompt" },
    ]
  }
];

export const AI_AGENTS = MODULES.map(m => ({
  moduleId: m.id,
  ...m.aiAgent
}));
