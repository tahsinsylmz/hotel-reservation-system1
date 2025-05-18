import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      hata: err.message,
      durum: 'hata'
    });
  }

  console.error('Hata:', err);
  return res.status(500).json({
    hata: 'Beklenmeyen bir hata oluştu',
    durum: 'hata'
  });
}; 