import { Request, Response } from 'express';
import { createContactSchema } from '../validators/contact.validator';
import { createContact, getAllContacts } from '../services/contact.service';

// Yeni mesaj oluştur
export const handleCreateContact = async (req: Request, res: Response) => {
    try {
        const parsed = createContactSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.issues });
        }

        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Bu fonksiyonun mesajı veritabanına kaydettiğini varsayıyoruz.
        const contact = await createContact({ ...parsed.data, ipAddress: String(ipAddress) });

        // ... payload doğrulama ve kaydetme sonrası: (İstenen kodun entegre edilmiş hali)
        const saved = contact; // createContact'tan dönen nesne zaten kaydedilmiştir.

        return res.status(201).json({
            ok: true,
            _id: saved._id, // Kaydedilen mesajın ID'si
            message: "Mesaj kaydedildi",
        });

    } catch (error) {
        console.error('Create contact error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Tüm mesajları getir (admin paneli için)
export const handleGetAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await getAllContacts();
        return res.status(200).json(contacts);
    } catch (error) {
        console.error('Get contacts error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};