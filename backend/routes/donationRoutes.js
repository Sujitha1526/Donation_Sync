import express from 'express';
import { createDonation, getAllDonations, requestDonation, acceptRequest, contributeDonation, completeDonation } from '../controllers/donationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // Apply auth middleware to all routes

router.post('/', createDonation);
router.get('/', getAllDonations);
router.post('/:id/request', requestDonation);
router.post('/:id/accept', acceptRequest);
router.post('/:id/contribute', contributeDonation);
router.post('/:id/complete', completeDonation);

export default router;