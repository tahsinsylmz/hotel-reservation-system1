import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export const rezervasyonYap = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { odaId, girisTarihi, cikisTarihi } = req.body;
    const musteriId = (req as any).user.id;

    // Check room availability
    const musaitMi = await prisma.rezervasyon.findFirst({
      where: {
        odaId,
        durum: 'AKTIF',
        OR: [
          {
            AND: [
              { girisTarihi: { lte: new Date(girisTarihi) } },
              { cikisTarihi: { gt: new Date(girisTarihi) } }
            ]
          },
          {
            AND: [
              { girisTarihi: { lt: new Date(cikisTarihi) } },
              { cikisTarihi: { gte: new Date(cikisTarihi) } }
            ]
          }
        ]
      }
    });

    if (musaitMi) {
      throw new AppError(400, 'Seçilen tarihler için oda müsait değil');
    }

    // Get room price
    const oda = await prisma.oda.findUnique({
      where: { id: odaId }
    });

    if (!oda) {
      throw new AppError(404, 'Oda bulunamadı');
    }

    // Calculate total price
    const gunSayisi = Math.ceil(
      (new Date(cikisTarihi).getTime() - new Date(girisTarihi).getTime()) 
      / (1000 * 60 * 60 * 24)
    );
    const toplamFiyat = oda.fiyat * gunSayisi;

    const rezervasyon = await prisma.rezervasyon.create({
      data: {
        musteriId,
        odaId,
        girisTarihi: new Date(girisTarihi),
        cikisTarihi: new Date(cikisTarihi),
        toplamFiyat,
        durum: 'AKTIF'
      },
      include: {
        oda: {
          include: {
            otel: true
          }
        }
      }
    });

    res.status(201).json({
      mesaj: 'Rezervasyon başarıyla oluşturuldu',
      rezervasyon
    });
  } catch (error) {
    next(error);
  }
};

export const rezervasyonIptal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const musteriId = (req as any).user.id;

    const rezervasyon = await prisma.rezervasyon.findUnique({
      where: { id: Number(id) }
    });

    if (!rezervasyon) {
      throw new AppError(404, 'Rezervasyon bulunamadı');
    }

    if (rezervasyon.musteriId !== musteriId) {
      throw new AppError(403, 'Bu işlem için yetkiniz yok');
    }

    const guncelRezervasyon = await prisma.rezervasyon.update({
      where: { id: Number(id) },
      data: { durum: 'IPTAL_EDILDI' }
    });

    res.json({
      mesaj: 'Rezervasyon başarıyla iptal edildi',
      rezervasyon: guncelRezervasyon
    });
  } catch (error) {
    next(error);
  }
};

export const rezervasyonlariListele = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const musteriId = (req as any).user.id;
    const rol = (req as any).user.rol;

    const where = rol === 'ADMIN' ? {} : { musteriId };

    const rezervasyonlar = await prisma.rezervasyon.findMany({
      where,
      include: {
        oda: {
          include: {
            otel: true
          }
        },
        musteri: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            email: true
          }
        }
      }
    });

    res.json({
      mesaj: 'Rezervasyonlar başarıyla listelendi',
      rezervasyonlar
    });
  } catch (error) {
    next(error);
  }
}; 