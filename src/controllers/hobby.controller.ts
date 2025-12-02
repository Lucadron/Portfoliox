import { Request, Response } from 'express';
import Hobby from '../models/hobby.model';
import { createHobbySchema, updateHobbySchema } from '../validators/hobby.validator';

// Tüm hobileri getir (sıralı)
export const getAllHobbies = async (req: Request, res: Response) => {
    try {
        const lang = req.query.lang === "en" ? "en" : "tr";

        const hobbies = await Hobby.find().sort({ order: 1 });

        const localized = hobbies.map(h => ({
            ...h.toObject(),
            title: h.title[lang],
            description: h.description[lang],
        }));

        return res.status(200).json(localized);
    } catch (error) {
        console.error("Hobby fetch error:", error);
        return res.status(500).json({ error: "Sunucu hatası" });
    }
};

// Yeni hobi ekle
export const createHobby = async (req: Request, res: Response) => {
    const parsed = createHobbySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
    }

    try {
        const hobby = await Hobby.create(parsed.data);
        return res.status(201).json(hobby);
    } catch (error) {
        console.error('Hobby create error:', error);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

// Hobi güncelle
export const updateHobby = async (req: Request, res: Response) => {
    const { id } = req.params;

    const parsed = updateHobbySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
    }

    try {
        const updated = await Hobby.findByIdAndUpdate(id, parsed.data, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Hobi bulunamadı' });
        }

        return res.status(200).json(updated);
    } catch (error) {
        console.error('Hobby update error:', error);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

// Hobi sil
export const deleteHobby = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await Hobby.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Hobi bulunamadı' });
        }

        return res.status(200).json({ message: 'Hobi silindi' });
    } catch (error) {
        console.error('Hobby delete error:', error);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};
