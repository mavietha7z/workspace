import express from 'express';
import userValidator from '../validators/user.validator';
import userController from '../controllers/user.controller';
import middleware from '../middleware';

const router = express.Router();

router.post('/register', userValidator.registerUser, userController.registerUser);

router.post('/login', userValidator.loginUser, userController.loginUser);

router.get('/current-user', middleware.verifyAdmin, userController.getCurrentUser);

router.get('/get-users', userValidator.getUsers, userController.getUsers);

router.put('/update-user', userValidator.updateUser, userController.updateUser);

export default router;
