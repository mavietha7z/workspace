import express from 'express';
import middleware from '../middleware';
import authValidator from '../validators/auth.validator';
import authController from '../controllers/auth.controller';

const router = express.Router();

// Admin routes
router.post('/login', authValidator.login, authController.login);

router.post('/logout', middleware.verifyAdmin, authController.logout);

router.post('/register', authValidator.register, authController.register);

router.get('/current-user', middleware.verifyAdmin, authController.current);

export default router;
