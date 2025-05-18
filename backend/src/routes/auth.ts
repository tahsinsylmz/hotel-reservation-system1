import { Router } from 'express';
import { auth, rolKontrol } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { musteriSchema } from '../middlewares/validation';
import { kayit, giris } from '../controllers/auth';

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ mesaj: 'Auth route çalışıyor' });
});

// Public routes
router.post('/kayit', validate(musteriSchema), kayit);
router.post('/giris', giris);

// Protected routes
router.get('/profil', auth, (req, res) => {
  res.json({ mesaj: 'Profil bilgileri' });
});

export default router;
