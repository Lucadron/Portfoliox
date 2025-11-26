import { Request, Response } from 'express';
import Cv from '../models/cv.model';
import { updateCvSchema } from '../validators/cv.validator';
import { incrementCvDownloads } from '../services/stats.service';
import path from 'path';

// CV linkini getir ve sayaç artır
import { Request, Response } from "express";
import Cv from "../models/cv.model";
import { incrementCvDownloads } from "../services/cv.service"; // senin increment fonksiyonunun yolu

export const getCv = async (req: Request, res: Response) => {
  try {
    const cv = await Cv.findOne();
    if (!cv) {
      return res.status(404).json({ error: "CV bulunamadı" });
    }

    // İndirme sayaç artır
    await incrementCvDownloads();

    // Kullanıcıyı PDF'e yönlendir
    return res.redirect(cv.cvUrl); // cvUrl = "http://localhost:8008/uploads/Emre Gulsen CV.pdf"
  } catch (error) {
    console.error("Get CV error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// CV linkini güncelle veya oluştur
export const updateCv = async (req: Request, res: Response) => {
  try {
    const parsed = updateCvSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }

    const { cvUrl } = parsed.data;

    let cv = await Cv.findOne();
    if (cv) {
      cv.cvUrl = cvUrl;
      await cv.save();
    } else {
      cv = await Cv.create({ cvUrl });
    }

    return res.status(200).json({
      message: 'CV bağlantısı güncellendi',
      cvUrl: cv.cvUrl
    });
  } catch (error) {
    console.error('Update CV error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const downloadCv = async (req: Request, res: Response) => {
  try {
    // 1) Sayaç arttır
    const cv = await Cv.findOne();
    if (cv) {
      cv.downloadCount = (cv.downloadCount || 0) + 1;
      await cv.save();
    }

    // 2) PDF dosyasının tam yolu
    //   controllers/  →  projede uploads klasörü kökte
    //   runtime'ta (dist) da çalışsa, iki seviye yukarı çıkmak güvenli olur:
    const filename = "Emre Gulsen CV.pdf";            // dosya adın
    const filePath = path.resolve(__dirname, "..", "..", "uploads", filename);

    // 3) İndirilebilir dosya olarak gönder
    return res.download(filePath, "Emre-Gulsen-CV.pdf"); // son kullanıcıya görünen isim
  } catch (err) {
    console.error("CV download error:", err);
    return res.status(500).json({ error: "CV indirilemedi" });
  }
};