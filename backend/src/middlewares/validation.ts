import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          hata: 'Geçersiz veri',
          detaylar: error.errors
        });
      }
      next(error);
    }
  };
};

// Validation schemas
export const musteriSchema = z.object({
  ad: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  soyad: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  telefon: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  sifre: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
});

export const otelSchema = z.object({
  ad: z.string().min(3, 'Otel adı en az 3 karakter olmalıdır'),
  adres: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  sehir: z.string().min(2, 'Şehir en az 2 karakter olmalıdır'),
  yildiz: z.number().min(1).max(5),
  aciklama: z.string().optional()
});

export const odaSchema = z.object({
  numara: z.string(),
  tip: z.string(),
  fiyat: z.number().positive(),
  kapasite: z.number().int().positive(),
  otelId: z.number().int().positive()
});

export const rezervasyonSchema = z.object({
  odaId: z.number().int().positive(),
  girisTarihi: z.string().datetime(),
  cikisTarihi: z.string().datetime()
}); 