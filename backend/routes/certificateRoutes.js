import express from 'express';
import { generateCertificate } from '../controllers/certificateController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // Apply auth middleware to all routes

router.get('/', generateCertificate);

export default router;