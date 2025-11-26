# 💼 My Portfolio – Backend API (Türkçe)

📖 [View this README in English](README.en.md)

---

## 🎯 Proje Amacı

Bu proje, geliştiricilerin kendi portföy içeriklerini dinamik olarak yönetebileceği, modern ve güvenli bir RESTful API altyapısı oluşturarak, başvuru süreçlerinde öne çıkmalarını sağlayacak bir back-end çözümüdür. Aynı zamanda, TypeScript + Node.js + MongoDB teknolojilerini öğrenmek ve gerçek bir uygulama üzerinden deneyim kazanmak amacıyla geliştirilmiştir.

---

## 🧱 Kullanılan Teknolojiler

| Katman        | Teknoloji             |
|---------------|------------------------|
| Dil           | TypeScript             |
| Runtime       | Node.js                |
| Framework     | Express.js             |
| Veritabanı    | MongoDB + Mongoose     |
| Doğrulama     | Zod                    |
| Kimlik Doğrulama | JWT                 |
| Middleware    | Express Custom Middleware |
| Environment   | dotenv                 |
| Sürüm Kontrol | Git + GitHub           |

---

## ✅ Yapılanlar

| Modül        | Açıklama                                                                 |
|--------------|--------------------------------------------------------------------------|
| Admin Login  | JWT tabanlı tek admin girişi aktif (`/api/overlord/login`)              |
| Projeler     | CRUD işlemleri + görüntülenme sayacı (`/api/projects`)                  |
| CV           | CV bağlantısı yönetimi + indirme sayaçlı API (`/api/cv`)                |
| Hakkımda     | Dinamik düzenlenebilir Hakkımda bölümü (`/api/about`)                   |
| Yetenekler   | Teknik beceri CRUD işlemleri (`/api/skills`)                            |
| Hobiler      | Hobiler CRUD işlemleri (`/api/hobbies`)                                 |
| İstatistik   | Tüm projelerin görüntülenme sayısı ve CV indirme sayısı (`/api/stats`)     |
| İletişim     | Ziyaretçi mesajları alınabiliyor ve IP adresi loglanabiliyordu (`/api/contact`) |
| Sağlık Kontrolü | Sunucunun çalıştığını test eden ping endpoint (`/api/ping`)          |

---

## 📁 Dosya Yapısı

src/
│
├── controllers/
├── routes/
├── models/
├── validators/
├── services/
├── middlewares/
├── app.ts
├── db.ts
├── env.ts


---

## 🚀 Kurulum ve Çalıştırma

```bash
git clone https://github.com/Lucadron/My-Portfolio.git
cd My-Portfolio
npm install
npm run dev
