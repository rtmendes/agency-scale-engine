import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAnswers = query({
  args: { moduleId: v.number() },
  handler: async (ctx, { moduleId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db.query("workbookAnswers")
      .withIndex("by_user_module", (q) => q.eq("userId", userId).eq("moduleId", moduleId))
      .collect();
  },
});

export const saveAnswer = mutation({
  args: { moduleId: v.number(), questionId: v.string(), answer: v.string() },
  handler: async (ctx, { moduleId, questionId, answer }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    const existing = await ctx.db.query("workbookAnswers")
      .withIndex("by_user_module", (q) => q.eq("userId", userId).eq("moduleId", moduleId))
      .collect();
    
    const found = existing.find(a => a.questionId === questionId);
    if (found) {
      await ctx.db.patch(found._id, { answer, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("workbookAnswers", {
        userId,
        moduleId,
        questionId,
        answer,
        updatedAt: Date.now(),
      });
    }
  },
});
