import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { ad, soyad, email, telefon, sifre } = req.body;

    // Check if user already exists
    const existingUser = await prisma.musteri.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(sifre, 10);

    // Create new user with MUSTERI role
    const user = await prisma.musteri.create({
      data: {
        ad,
        soyad,
        email,
        telefon,
        sifre: hashedPassword,
        rol: 'MUSTERI'
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.rol },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: user.id,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        telefon: user.telefon,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Kayıt işlemi başarısız' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, sifre } = req.body;

    // Find user by email
    const user = await prisma.musteri.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Geçersiz e-posta veya şifre' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(sifre, user.sifre);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Geçersiz e-posta veya şifre' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.rol },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user.id,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        telefon: user.telefon,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Giriş işlemi başarısız' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const user = await prisma.musteri.findUnique({
      where: { id: userId },
      select: {
        id: true,
        ad: true,
        soyad: true,
        email: true,
        telefon: true,
        rol: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Profil bilgileri alınamadı' });
  }
}; 