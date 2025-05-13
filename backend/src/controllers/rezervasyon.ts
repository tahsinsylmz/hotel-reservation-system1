import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { rezervasyonSchema } from '../middlewares/validation';

const prisma = new PrismaClient();

export const rezervasyonYap = async (req: Request, res: Response) => {
  try {
    const { odaId, girisTarihi, cikisTarihi } = rezervasyonSchema.parse(req.body);
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
      return res.status(400).json({ hata: 'Seçilen tarihler için oda müsait değil' });
    }

    // Get room price
    const oda = await prisma.oda.findUnique({
      where: { id: odaId }
    });

    if (!oda) {
      return res.status(404).json({ hata: 'Oda bulunamadı' });
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
      }
    });

    res.status(201).json({
      mesaj: 'Rezervasyon başarıyla oluşturuldu',
      rezervasyon
    });
  } catch (error) {
    res.status(400).json({ hata: 'Rezervasyon oluşturma başarısız' });
  }
};

export const rezervasyonIptal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const musteriId = (req as any).user.id;

    const rezervasyon = await prisma.rezervasyon.findUnique({
      where: { id: Number(id) }
    });

    if (!rezervasyon) {
      return res.status(404).json({ hata: 'Rezervasyon bulunamadı' });
    }

    if (rezervasyon.musteriId !== musteriId) {
      return res.status(403).json({ hata: 'Bu işlem için yetkiniz yok' });
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
    res.status(400).json({ hata: 'Rezervasyon iptal edilemedi' });
  }
}; 