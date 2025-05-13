import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import otelRoutes from './routes/otel';
import odaRoutes from './routes/oda';
import rezervasyonRoutes from './routes/rezervasyon';
import musteriRoutes from './routes/musteri';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/oteller', otelRoutes);
app.use('/api/odalar', odaRoutes);
app.use('/api/rezervasyonlar', rezervasyonRoutes);
app.use('/api/musteriler', musteriRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { prisma }; 