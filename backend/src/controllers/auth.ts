import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export const kayit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ad, soyad, email, telefon, sifre } = req.body;

    const mevcutMusteri = await prisma.musteri.findUnique({
      where: { email }
    });

    if (mevcutMusteri) {
      throw new AppError(400, 'Bu e-posta adresi zaten kullanılıyor');
    }

    const hashedSifre = await bcrypt.hash(sifre, 10);

    const musteri = await prisma.musteri.create({
      data: {
        ad,
        soyad,
        email,
        telefon,
        sifre: hashedSifre,
        rol: 'MUSTERI'
      }
    });

    const token = jwt.sign(
      { id: musteri.id, rol: musteri.rol },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      mesaj: 'Kayıt başarılı',
      token,
      musteri: {
        id: musteri.id,
        ad: musteri.ad,
        soyad: musteri.soyad,
        email: musteri.email,
        rol: musteri.rol
      }
    });
  } catch (error) {
    next(error);
  }
};

export const giris = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, sifre } = req.body;

    const musteri = await prisma.musteri.findUnique({
      where: { email }
    });

    if (!musteri) {
      throw new AppError(401, 'Geçersiz e-posta veya şifre');
    }

    const sifreGecerli = await bcrypt.compare(sifre, musteri.sifre);

    if (!sifreGecerli) {
      throw new AppError(401, 'Geçersiz e-posta veya şifre');
    }

    const token = jwt.sign(
      { id: musteri.id, rol: musteri.rol },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      mesaj: 'Giriş başarılı',
      token,
      musteri: {
        id: musteri.id,
        ad: musteri.ad,
        soyad: musteri.soyad,
        email: musteri.email,
        rol: musteri.rol
      }
    });
  } catch (error) {
    next(error);
  }
}; 