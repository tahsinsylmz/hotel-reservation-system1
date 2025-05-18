import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, ad, soyad, telefon } = req.body;

    // Check if user already exists
    const existingUser = await prisma.kullanici.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.kullanici.create({
      data: {
        email,
        sifre: hashedPassword,
        ad,
        soyad,
        telefon,
        rol: 'MUSTERI'
      }
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        ad: user.ad,
        soyad: user.soyad,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Kayıt işlemi başarısız' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.kullanici.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.sifre);
    if (!validPassword) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        ad: user.ad,
        soyad: user.soyad,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Giriş işlemi başarısız' });
  }
});

export default router; 