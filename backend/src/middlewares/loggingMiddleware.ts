import morgan from 'morgan';
import { Request, Response } from 'express';

morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('user', (req: Request) => req.user?.email || 'anonymous');
 
export const loggingMiddleware = morgan(
  ':method :url :status :response-time ms - :user - :body'
); 