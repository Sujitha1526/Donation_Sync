import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;
