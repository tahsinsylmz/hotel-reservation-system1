import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { odaSchema } from '../middlewares/validation';

const prisma = new PrismaClient();

export const odaOlustur = async (req: Request, res: Response) => {
  try {
    const odaData = odaSchema.parse(req.body);
    const otelId = Number(req.params.otelId);

    // Check if user is the hotel manager
    const otel = await prisma.otel.findUnique({
      where: { id: otelId }
    });

    if (!otel || otel.yoneticiId !== (req as any).user.id) {
      return res.status(403).json({ hata: 'Bu işlem için yetkiniz yok' });
    }

    const oda = await prisma.oda.create({
      data: {
        ...odaData,
        otelId
      }
    });

    res.status(201).json({
      mesaj: 'Oda başarıyla oluşturuldu',
      oda
    });
  } catch (error) {
    res.status(400).json({ hata: 'Oda oluşturma başarısız' });
  }
};

export const musaitOdalariListele = async (req: Request, res: Response) => {
  try {
    const { otelId, girisTarihi, cikisTarihi } = req.query;

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

    res.json(odalar);
  } catch (error) {
    res.status(400).json({ hata: 'Müsait odalar listelenemedi' });
  }
}; 