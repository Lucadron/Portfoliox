import { Request, Response } from 'express';
import Cv from '../models/cv.model';
import { updateCvSchema } from '../validators/cv.validator';
import { incrementCvDownloads } from '../services/stats.service';
import path from 'path';
import fs from 'fs';

// ------------------------------------------
// CV GET (Browser'da aç / redirect)
// ------------------------------------------
export const getCv = async (req: Request, res: Response) => {
  try {
    const cv = await Cv.findOne();
    if (!cv) {
      return res.status(404).json({ error: "CV bulunamadı" });
    }

    // Sayaç arttır
    await incrementCvDownloads();

    // Eğer URL mutlaksa (http ile başlıyorsa) → direkt yönlendir
    if (cv.cvUrl.startsWith("http")) {
      return res.redirect(cv.cvUrl);
    }

    // Eğer URL yerel dosyaysa, doğru path'i çöz ve gönder
    const absolutePath = path.resolve(process.cwd(), "uploads", cv.cvUrl);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: "CV dosyası bulunamadı" });
    }

    return res.sendFile(absolutePath);
  } catch (error) {
    console.error("Get CV error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ------------------------------------------
// CV URL güncelle
// ------------------------------------------
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

// ------------------------------------------
// Direk indirilebilir dosya (Attachment)
// ------------------------------------------
export const downloadCv = async (req: Request, res: Response) => {
  try {
    const cv = await Cv.findOne();
    if (!cv) {
      return res.status(404).json({ error: "CV bulunamadı" });
    }

    // Sayaç arttır
    cv.downloadCount = (cv.downloadCount || 0) + 1;
    await cv.save();

    // Mutlak URL varsa, indirme için redirect yap
    if (cv.cvUrl.startsWith("http")) {
      return res.redirect(cv.cvUrl);
    }

    // Yerel dosya için path
    const absolutePath = path.resolve(process.cwd(), "uploads", cv.cvUrl);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: "CV dosyası bulunamadı" });
    }

    return res.download(absolutePath, "Emre-Gulsen-CV.pdf");
  } catch (err) {
    console.error("CV download error:", err);
    return res.status(500).json({ error: "CV indirilemedi" });
  }
};
