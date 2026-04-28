import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db.query("progress").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
  },
});

export const getModule = query({
  args: { moduleId: v.number() },
  handler: async (ctx, { moduleId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.query("progress")
      .withIndex("by_user_module", (q) => q.eq("userId", userId).eq("moduleId", moduleId))
      .first();
  },
});

export const toggleChecklistItem = mutation({
  args: { moduleId: v.number(), itemId: v.string() },
  handler: async (ctx, { moduleId, itemId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    const existing = await ctx.db.query("progress")
      .withIndex("by_user_module", (q) => q.eq("userId", userId).eq("moduleId", moduleId))
      .first();
    
    if (!existing) {
      const defaults = getDefaultChecklist(moduleId);
      const items = defaults.map(d => ({
        ...d,
        completed: d.id === itemId ? true : false,
      }));
      await ctx.db.insert("progress", {
        userId,
        moduleId,
        checklistItems: items,
      });
    } else {
      const items = existing.checklistItems.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      const allDone = items.every(i => i.completed);
      await ctx.db.patch(existing._id, {
        checklistItems: items,
        completedAt: allDone ? Date.now() : undefined,
      });
    }
  },
});

export const saveNotes = mutation({
  args: { moduleId: v.number(), notes: v.string() },
  handler: async (ctx, { moduleId, notes }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    const existing = await ctx.db.query("progress")
      .withIndex("by_user_module", (q) => q.eq("userId", userId).eq("moduleId", moduleId))
      .first();
    
    if (!existing) {
      const defaults = getDefaultChecklist(moduleId);
      await ctx.db.insert("progress", {
        userId,
        moduleId,
        checklistItems: defaults.map(d => ({ ...d, completed: false })),
        notes,
      });
    } else {
      await ctx.db.patch(existing._id, { notes });
    }
  },
});

function getDefaultChecklist(moduleId: number) {
  const checklists: Record<number, { id: string; label: string }[]> = {
    1: [
      { id: "m1_c1", label: "Complete Agency Scale Stack self-assessment" },
      { id: "m1_c2", label: "Map current team and identify gaps" },
      { id: "m1_c3", label: "Calculate revenue-to-headcount ratio" },
      { id: "m1_c4", label: "Create 90-day hiring priority matrix" },
      { id: "m1_c5", label: "Run Agency Architect prompt" },
    ],
    2: [
      { id: "m2_c1", label: "Identify your most critical next hire" },
      { id: "m2_c2", label: "Write outcome-focused job description" },
      { id: "m2_c3", label: "Create role-specific assessment test" },
      { id: "m2_c4", label: "Build hiring scorecard with criteria" },
      { id: "m2_c5", label: "Run Talent Scout prompt" },
    ],
    3: [
      { id: "m3_c1", label: "Design BOD/MOD/EOD for most critical role" },
      { id: "m3_c2", label: "Build 30-60-90 day ramp plan" },
      { id: "m3_c3", label: "Define 5 outcome-based KPIs per role" },
      { id: "m3_c4", label: "Create focus questions for reviews" },
      { id: "m3_c5", label: "Run Ops Commander prompt" },
    ],
    4: [
      { id: "m4_c1", label: "Audit current campaign structure" },
      { id: "m4_c2", label: "Create creative testing calendar" },
      { id: "m4_c3", label: "Build optimization decision tree" },
      { id: "m4_c4", label: "Set up reporting cadence" },
      { id: "m4_c5", label: "Run Media Buying Analyst prompt" },
    ],
    5: [
      { id: "m5_c1", label: "Write 3 hook variations" },
      { id: "m5_c2", label: "Complete full script with universal architecture" },
      { id: "m5_c3", label: "Create script testing matrix" },
      { id: "m5_c4", label: "Adapt script for 2+ platforms" },
      { id: "m5_c5", label: "Run Script Writer prompt" },
    ],
    6: [
      { id: "m6_c1", label: "Define Platinum Tier tier criteria" },
      { id: "m6_c2", label: "Map response protocols per tier" },
      { id: "m6_c3", label: "Set up lead scoring system" },
      { id: "m6_c4", label: "Calculate conversion targets by tier" },
      { id: "m6_c5", label: "Run Deal Qualifier prompt" },
    ],
  };
  return (checklists[moduleId] || []).map(c => ({ ...c, completed: false }));
}
