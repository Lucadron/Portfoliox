import { Request, Response } from 'express';
import Cv from '../models/cv.model';
import path from 'path';

// CV indir (her zaman uploads klasöründeki sabit dosyayı indirir)
export const downloadCv = async (req: Request, res: Response) => {
  try {
    const cv = await Cv.findOne();
    if (cv) {
      cv.downloadCount = (cv.downloadCount || 0) + 1;
      await cv.save();
    }

    const filePath = path.resolve(__dirname, "..", "..", "uploads", "Emre-Gulsen-CV.pdf");

    return res.download(filePath, "Emre-Gulsen-CV.pdf");
  } catch (err) {
    console.error("CV download error:", err);
    return res.status(500).json({ error: "CV indirilemedi" });
  }
};

export const increaseCvCounterOnly = async (req: Request, res: Response) => {
  try {
    const cv = await Cv.findOne();
    if (cv) {
      cv.downloadCount = (cv.downloadCount || 0) + 1;
      await cv.save();
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CV counter error:", err);
    return res.status(500).json({ error: "Counter failed" });
  }
};

// Sadece veritabanından cv bilgisi döner ama yönlendirme yapmaz
export const getCv = async (req: Request, res: Response) => {
  const cv = await Cv.findOne();
  return res.json(cv);
};

// CV URL güncelleme (artık pdf URL tutmanı gerektirmiyor)
export const updateCv = async (req: Request, res: Response) => {
  try {
    const { cvUrl } = req.body;

    let cv = await Cv.findOne();
    if (!cv) cv = await Cv.create({ cvUrl });
    else {
      cv.cvUrl = cvUrl;
      await cv.save();
    }

    return res.json({ message: "CV güncellendi", cv });
  } catch (err) {
    return res.status(500).json({ error: "CV güncellenemedi" });
  }
};
