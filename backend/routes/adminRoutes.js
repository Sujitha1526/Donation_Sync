import express from 'express';
import {
  getDashboardStats,
  getTopDonors,
  getTopVolunteers,
  getCategoryStats,
  getRecentActivity,
} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // Protect routes

router.get('/stats', getDashboardStats);
router.get('/top-donors', getTopDonors);
router.get('/top-volunteers', getTopVolunteers);
router.get('/categories', getCategoryStats);
router.get('/activity', getRecentActivity);

export default router;