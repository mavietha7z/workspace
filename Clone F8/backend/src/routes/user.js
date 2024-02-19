import { Router } from 'express';
import middleware from '../middleware/middleware';
import userController from '../controllers/userController';
import uploadAvatar from '../config/cloudinary.avatar';

const router = Router();

// Lấy tất dữ liệu người dùng theo type
router.get('/', middleware.verifyTokenAndAdmin, userController.getUsers);

// Xóa người dùng theo type
router.delete('/delete', middleware.verifyTokenAndAdmin, userController.deleteUser);

// Đăng ký khóa học
router.post('/registered-course', middleware.verifyToken, userController.registerCourse);

// Lấy dữ liệu trang cá nhân bằng username
router.get('/get-info/:username', middleware.verifyToken, userController.getUserByUserName);

// Thay đổi avatar người dùng
router.post('/avatar', uploadAvatar.single('avatar'), middleware.verifyToken, userController.changeAvatarUser);

// Thay đổi ảnh bìa người dùng
router.post('/cover', uploadAvatar.single('cover'), middleware.verifyToken, userController.changeCoverUser);

// Thay đổi thông tin người dùng
router.post('/info', middleware.verifyToken, userController.changeInfoUser);

// Xem thông báo theo type
router.post('/alert/mark', middleware.verifyToken, userController.markWatched);

// Lấy dữ liệu bài viết đã lưu
router.get('/bookmark', middleware.verifyToken, userController.getPostSave);

// Thay đổi trạng thái
router.post('/status', middleware.verifyTokenAndAdmin, userController.toggleStatusChange);

export default router;
