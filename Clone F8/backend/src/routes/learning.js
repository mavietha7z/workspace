import { Router } from 'express';
import middleware from '../middleware/middleware';
import uploadCourse from '../config/cloudinary.course';
import learningRoute from '../controllers/learningRoute';
import validateLearningPath from '../validator/validateLearningPath';

const router = Router();

// Lấy dữ liệu lộ trình học
router.get('/', learningRoute.getLearningRoute);

// Thêm mới lộ trình học
router.post(
    '/create',
    middleware.verifyTokenAndAdmin,
    uploadCourse.single('image'),
    validateLearningPath.create,
    learningRoute.createLearningPath
);

// Thêm mới nhóm khóa học vào lộ trình học
router.post(
    '/create-group',
    middleware.verifyTokenAndAdmin,
    validateLearningPath.createGroup,
    learningRoute.createGroupLearningPath
);

// Thêm mới khóa học vào nhóm học trong lộ trình học
router.post('/add-course', middleware.verifyTokenAndAdmin, learningRoute.addCourseToGroup);

// Lấy lộ trình học bằng id
router.get('/get/:id', middleware.verifyTokenAndAdmin, learningRoute.getLearningPathById);

// Lấy lộ trình học bằng slug
router.get('/path/:slug', learningRoute.getLearningRouteBySlug);

// Thay đổi trạng thái
router.post('/status', middleware.verifyTokenAndAdmin, learningRoute.toggleStatus);

// Xóa lộ trình học
router.delete('/delete', middleware.verifyTokenAndAdmin, learningRoute.deleteLearningPath);

// Cập nhật lộ trình học
router.put('/update', middleware.verifyTokenAndAdmin, validateLearningPath.update, learningRoute.updateLearningPath);

export default router;
