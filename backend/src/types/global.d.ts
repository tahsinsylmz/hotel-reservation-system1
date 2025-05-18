import { Rol } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        rol: Rol;
      };
    }
  }
}

export {}; 