import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: number;
    rol: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const user = await prisma.musteri.findUnique({
      where: { id: decoded.id },
      select: { id: true, rol: true }
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ hata: 'Lütfen giriş yapın.' });
  }
};

export const rolKontrol = (izinliRoller: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !izinliRoller.includes(req.user.rol)) {
      return res.status(403).json({ hata: 'Bu işlem için yetkiniz yok.' });
    }
    next();
  };
}; 