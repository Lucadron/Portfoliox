import { Request, Response } from 'express';
import Skill from '../models/skills.model';
import { createSkillSchema, updateSkillSchema } from '../validators/skills.validator';


// Tüm becerileri sırayla getir
export const getAllSkills = async (_req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    return res.status(200).json(skills);
  } catch (error) {
    console.error('Skill fetch error:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Yeni beceri ekle
export const createSkill = async (req: Request, res: Response) => {
  const parsed = createSkillSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues });
  }

  try {
    const skill = await Skill.create(parsed.data);
    return res.status(201).json(skill);
  } catch (error) {
    console.error('Skill create error:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Beceri güncelle
export const updateSkill = async (req: Request, res: Response) => {
  const { id } = req.params;

  const parsed = updateSkillSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues });
  }

  try {
    const updated = await Skill.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Beceri bulunamadı' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Skill update error:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Beceri sil
export const deleteSkill = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Skill.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Beceri bulunamadı' });
    }

    return res.status(200).json({ message: 'Beceri silindi' });
  } catch (error) {
    console.error('Skill delete error:', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};
