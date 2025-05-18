import { Router } from 'express';
import { auth, rolKontrol } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { otelSchema } from '../middlewares/validation';
import { otelOlustur, otelleriListele, otelDetay } from '../controllers/otel';

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ mesaj: 'Otel route çalışıyor' });
});

// Public routes
router.get('/', otelleriListele);
router.get('/:id', otelDetay);

// Protected routes (Hotel Manager only)
router.post('/', auth, rolKontrol(['OTEL_YONETICISI']), validate(otelSchema), otelOlustur);
router.put('/:id', auth, rolKontrol(['OTEL_YONETICISI']), validate(otelSchema), (req, res) => {
  res.json({ mesaj: 'Otel güncellendi' });
});

export default router; 