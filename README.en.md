# 💼 My Portfolio – Backend API (English)

📖 [Bu dökümanı Türkçe görüntüle](README.md)

---

## 🎯 Project Purpose

This project provides a modern and secure RESTful API backend that enables developers to dynamically manage their portfolio content and stand out in job application processes. It is also designed as a learning project to gain real-world experience with TypeScript, Node.js, and MongoDB.

---

## 🧱 Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| Language      | TypeScript               |
| Runtime       | Node.js                  |
| Framework     | Express.js               |
| Database      | MongoDB + Mongoose       |
| Validation    | Zod                      |
| Auth          | JWT                      |
| Middleware    | Express Custom Middleware|
| Environment   | dotenv                   |
| Versioning    | Git + GitHub             |

---

## ✅ Implemented Modules

| Module        | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| Admin Login   | Single admin login with JWT (`/api/overlord/login`)                        |
| Projects      | Full CRUD + view counter (`/api/projects`)                                 |
| CV            | Manage CV link + download counter API (`/api/cv`)                          |
| About         | Editable "About Me" section (`/api/about`)                                 |
| Skills        | Technical skills CRUD (`/api/skills`)                                      |
| Hobbies       | Hobbies CRUD (`/api/hobbies`)                                              |
| Stats         | Total project views and CV downloads (`/api/stats`)                        |
| Contact       | Accepts visitor messages and logs IP address (`/api/contact`)              |
| Health Check  | Ping endpoint to test server status (`/api/ping`)                          |

---

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

## 🚀 Setup & Run

```bash
git clone https://github.com/Lucadron/My-Portfolio.git
cd My-Portfolio
npm install
npm run dev

## 📁 Project Structure

