import { z } from "zod";

const multiLangString = z.object({
    tr: z.string().min(2),
    en: z.string().min(2),
});

export const createHobbySchema = z.object({
    title: multiLangString,
    description: multiLangString,
    icon: z.string().min(1),
    order: z.number().optional(),
});

export const updateHobbySchema = z.object({
    title: multiLangString.optional(),
    description: multiLangString.optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
});

export type CreateHobbyInput = z.infer<typeof createHobbySchema>;
export type UpdateHobbyInput = z.infer<typeof updateHobbySchema>;
