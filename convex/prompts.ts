import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getResults = query({
  args: { moduleId: v.number() },
  handler: async (ctx, { moduleId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db.query("promptResults")
      .withIndex("by_user_module", (q) => q.eq("userId", userId).eq("moduleId", moduleId))
      .collect();
  },
});

export const saveResult = mutation({
  args: { moduleId: v.number(), promptName: v.string(), input: v.string(), output: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.insert("promptResults", {
      userId,
      ...args,
      createdAt: Date.now(),
    });
  },
});
