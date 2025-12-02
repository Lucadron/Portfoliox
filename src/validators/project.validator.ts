import { z } from 'zod';

// Çok dilli alanlar için ortak şema
const multiLangString = z.object({
  tr: z.string().min(3),
  en: z.string().min(3),
});

// Proje ekleme
export const createProjectSchema = z.object({
  title: multiLangString,
  description: multiLangString,

  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),

  tags: z.array(z.string()).optional(),
  technologies: z.array(z.string()),

  category: z.enum(["Backend", "Frontend", "FullStack", "ML", "UI/UX", "Other"]),
  highlighted: z.boolean().optional(),
});

// Güncelleme (hepsi opsiyonel)
export const updateProjectSchema = z.object({
  title: multiLangString.optional(),
  description: multiLangString.optional(),

  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),

  tags: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),

  category: z.enum(["Backend", "Frontend", "FullStack", "ML", "UI/UX", "Other"]).optional(),
  highlighted: z.boolean().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
