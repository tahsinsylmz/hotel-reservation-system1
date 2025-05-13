import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { otelSchema } from '../middlewares/validation';

const prisma = new PrismaClient();

export const otelOlustur = async (req: Request, res: Response) => {
  try {
    const otelData = otelSchema.parse(req.body);
    const yoneticiId = (req as any).user.id;

    const otel = await prisma.otel.create({
      data: {
        ...otelData,
        yoneticiId
      }
    });

    res.status(201).json({
      mesaj: 'Otel başarıyla oluşturuldu',
      otel
    });
  } catch (error) {
    res.status(400).json({ hata: 'Otel oluşturma başarısız' });
  }
};

export const otelleriListele = async (req: Request, res: Response) => {
  try {
    const { sehir, yildiz } = req.query;
    
    const where = {
      ...(sehir && { sehir: String(sehir) }),
      ...(yildiz && { yildiz: Number(yildiz) })
    };

    const oteller = await prisma.otel.findMany({
      where,
      include: {
        odalar: true
      }
    });

    res.json(oteller);
  } catch (error) {
    res.status(400).json({ hata: 'Oteller listelenemedi' });
  }
};

export const otelDetay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const otel = await prisma.otel.findUnique({
      where: { id: Number(id) },
      include: {
        odalar: true,
        yonetici: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            email: true
          }
        }
      }
    });

    if (!otel) {
      return res.status(404).json({ hata: 'Otel bulunamadı' });
    }

    res.json(otel);
  } catch (error) {
    res.status(400).json({ hata: 'Otel detayları alınamadı' });
  }
}; 