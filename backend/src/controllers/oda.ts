import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export const musaitOdalariListele = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { girisTarihi, cikisTarihi, otelId } = req.query;

    if (!girisTarihi || !cikisTarihi) {
      throw new AppError(400, 'Giriş ve çıkış tarihi gereklidir');
    }

    const odalar = await prisma.$queryRaw`
      SELECT o.*, ot.ad as otel_adi
      FROM odalar o
      JOIN oteller ot ON o.otel_id = ot.id
      WHERE o.otel_id = ${Number(otelId)}
      AND NOT EXISTS (
        SELECT 1 
        FROM rezervasyonlar r 
        WHERE r.oda_id = o.id 
        AND r.durum = 'AKTIF'
        AND (
          (r.giris_tarihi <= ${new Date(String(cikisTarihi))} AND r.cikis_tarihi >= ${new Date(String(girisTarihi))})
        )
      )
    `;

    res.json({
      mesaj: 'Müsait odalar başarıyla listelendi',
      odalar
    });
  } catch (error) {
    next(error);
  }
};

export const odaOlustur = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otelId } = req.params;
    const odaData = req.body;

    // Check if user is the hotel manager
    const otel = await prisma.otel.findUnique({
      where: { id: Number(otelId) }
    });

    if (!otel || otel.yoneticiId !== (req as any).user.id) {
      throw new AppError(403, 'Bu işlem için yetkiniz yok');
    }

    const oda = await prisma.oda.create({
      data: {
        ...odaData,
        otelId: Number(otelId)
      }
    });

    res.status(201).json({
      mesaj: 'Oda başarıyla oluşturuldu',
      oda
    });
  } catch (error) {
    next(error);
  }
}; 