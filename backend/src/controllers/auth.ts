import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { musteriSchema } from '../middlewares/validation';

const prisma = new PrismaClient();

export const kayit = async (req: Request, res: Response) => {
  try {
    const { ad, soyad, email, telefon, sifre } = musteriSchema.parse(req.body);

    const mevcutMusteri = await prisma.musteri.findUnique({
      where: { email }
    });

    if (mevcutMusteri) {
      return res.status(400).json({ hata: 'Bu e-posta adresi zaten kullanılıyor.' });
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
      { id: musteri.id },
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
    res.status(400).json({ hata: 'Kayıt işlemi başarısız' });
  }
};

export const giris = async (req: Request, res: Response) => {
  try {
    const { email, sifre } = req.body;

    const musteri = await prisma.musteri.findUnique({
      where: { email }
    });

    if (!musteri) {
      return res.status(401).json({ hata: 'Geçersiz e-posta veya şifre' });
    }

    const sifreGecerli = await bcrypt.compare(sifre, musteri.sifre);

    if (!sifreGecerli) {
      return res.status(401).json({ hata: 'Geçersiz e-posta veya şifre' });
    }

    const token = jwt.sign(
      { id: musteri.id },
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
    res.status(400).json({ hata: 'Giriş işlemi başarısız' });
  }
}; 