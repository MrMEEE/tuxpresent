import express from 'express';
import { exportToPDF } from '../controllers/exportController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/presentations/:id/pdf', protect, exportToPDF);

export default router;
