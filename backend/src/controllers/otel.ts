import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { otelSchema } from '../middlewares/validation';
import { AppError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export const otelOlustur = async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
};

export const otelleriListele = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sehir } = req.query;

    const where = sehir ? { sehir: String(sehir) } : {};

    const oteller = await prisma.otel.findMany({
      where,
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

    res.json({
      mesaj: 'Oteller başarıyla listelendi',
      oteller
    });
  } catch (error) {
    next(error);
  }
};

export const otelDetay = async (req: Request, res: Response, next: NextFunction) => {
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
      throw new AppError(404, 'Otel bulunamadı');
    }

    res.json({
      mesaj: 'Otel detayları başarıyla getirildi',
      otel
    });
  } catch (error) {
    next(error);
  }
}; 