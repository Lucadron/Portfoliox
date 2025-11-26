// Express framework'ünü içe aktarıyoruz
import express from 'express';
import path from 'path';
import cors from 'cors';

import pingRouter from './routes/ping.route';
import projectRouter from './routes/project.route';
import authRouter from './routes/auth.route';
import aboutRouter from './routes/about.route';
import cvRouter from './routes/cv.route';
import skillRouter from './routes/skills.route';
import hobbyRouter from './routes/hobby.route';
import statsRouter from './routes/stats.route';
import contactRouter from './routes/contact.route';

// Bir Express uygulaması başlatıyoruz
const app = express();

// JSON formatındaki isteklerin body’sini parse edebilmek için middleware ekliyoruz
app.use(express.json());

// API routing
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const allowedOrigins = [
  "http://localhost:8008",
  "http://localhost:8009",
  "https://emregulsen.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS BLOCKED: " + origin));
  },
  credentials: false,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// // Preflight için:
// app.options("*", cors({ origin: FRONTEND_ORIGIN }));

app.use('/api', pingRouter);
app.use('/api/projects', projectRouter);
app.use('/api/overlord', authRouter);
app.use('/api/about', aboutRouter);
app.use('/api/cv', cvRouter);
app.use('/api/skills', skillRouter);
app.use('/api/hobbies', hobbyRouter);
app.use('/api/stats', statsRouter);
app.use('/api/contact', contactRouter);

// Test amaçlı bir GET endpoint tanımlıyoruz
// Tarayıcıdan http://localhost:8008/ yazıldığında bu çalışır
app.get('/', (req, res) => {
  res.send('Portfolyo Backend çalışıyor.');
});

// Uygulamayı dışarıya aktarıyoruz (server.ts kullanacak)
export default app;
