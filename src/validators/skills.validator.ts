import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(1, "İsim zorunludur"),
  level: z.number().min(0).max(100), // yüzde
  category: z.enum(["Frontend", "Backend","Database" , "Tools"]),
  order: z.number().int().min(0).optional(),
});

export const updateSkillSchema = createSkillSchema.partial();

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
