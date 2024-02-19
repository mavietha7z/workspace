import { Router } from 'express';
import middleware from '../middleware/middleware';
import lessonController from '../controllers/lessonController';
import validateLesson from '../validator/validateLesson';

const router = Router();

// Lấy dữ liệu bài học bằng id
router.get('/', middleware.verifyToken, lessonController.getLessonById);

// Thêm mới bài học cho chương
router.post('/create', middleware.verifyTokenAndAdmin, validateLesson.create, lessonController.createLesson);

export default router;
