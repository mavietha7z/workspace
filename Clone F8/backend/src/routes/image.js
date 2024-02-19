import { Router } from 'express';
import uploadPost from '../config/cloudinary.post';
import imageController from '../controllers/imageController';
import middleware from '../middleware/middleware';

const router = Router();

// Upload ảnh lấy url
router.post('/image', uploadPost.single('image'), middleware.verifyToken, imageController.uploadImage);

export default router;
