import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  
  // Track user progress through modules
  progress: defineTable({
    userId: v.id("users"),
    moduleId: v.number(), // 1-6
    checklistItems: v.array(v.object({
      id: v.string(),
      label: v.string(),
      completed: v.boolean(),
    })),
    notes: v.optional(v.string()),
    completedAt: v.optional(v.number()),
  }).index("by_user", ["userId"]).index("by_user_module", ["userId", "moduleId"]),

  // Store AI prompt results
  promptResults: defineTable({
    userId: v.id("users"),
    moduleId: v.number(),
    promptName: v.string(),
    input: v.string(),
    output: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]).index("by_user_module", ["userId", "moduleId"]),

  // Store workbook answers
  workbookAnswers: defineTable({
    userId: v.id("users"),
    moduleId: v.number(),
    questionId: v.string(),
    answer: v.string(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_user_module", ["userId", "moduleId"]),
});

export default schema;
