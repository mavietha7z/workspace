import express from 'express';
import middleware from '../middleware';
import authService from '../services/auth.service';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', authService.login, authController.login);

router.get('/logout', middleware.logoutUser, authController.logout);

router.post('/register', authService.register, authController.register);

export default router;
