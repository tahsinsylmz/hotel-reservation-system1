import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import otelRoutes from './routes/otelRoutes';
import odaRoutes from './routes/odaRoutes';
import rezervasyonRoutes from './routes/rezervasyonRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/oteller', otelRoutes);
app.use('/api/odalar', odaRoutes);
app.use('/api/rezervasyonlar', rezervasyonRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 