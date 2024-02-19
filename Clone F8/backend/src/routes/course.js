import { Router } from 'express';
import middleware from '../middleware/middleware';
import uploadCourse from '../config/cloudinary.course';
import validateCourse from '../validator/validateCourse';
import courseController from '../controllers/courseController';

const router = Router();

// Thêm mới khóa học
router.post(
    '/create',
    middleware.verifyTokenAndAdmin,
    uploadCourse.fields([
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
    ]),
    validateCourse.create,
    courseController.createCourse
);

// Lấy khóa học theo type
router.get('/', middleware.veryAdminGetData, courseController.getCourses);

// Lấy dữ liệu quá học bằng slug
router.get('/path', middleware.verifyToken, courseController.getCourseByPathName);

// Cập nhật khóa học
router.put(
    '/update',
    middleware.verifyTokenAndAdmin,
    middleware.validateDataUpdateCourse,
    courseController.updateCourse
);

// Xóa khóa học theo type
router.delete('/delete', middleware.verifyTokenAndAdmin, courseController.deleteCourse);

// Thay đổi trạng thái khóa học
router.post('/status', middleware.verifyTokenAndAdmin, courseController.toggleStatusCourse);

// Lấy dữ liệu bài học người dùng đã đăng ký
router.get('/registered', middleware.verifyToken, courseController.getCoursesRegistered);

export default router;
