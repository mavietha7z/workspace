import { Router } from 'express';
import middleware from '../middleware/middleware';
import validateAuth from '../validator/validateAuth';
import authController from '../controllers/authController';

const router = Router();

// Gửi mã xác minh email
router.post('/verify-email', authController.verifyEmail);

// Đăng ký tài khoản mới
router.post('/register', validateAuth.register, authController.registerUser);

// Đăng nhập tài khoản người dùng
router.post('/login', validateAuth.login, authController.loginUser);

// Đăng xuất tài khoản
router.post('/logout', middleware.verifyToken, authController.logoutUser);

// Request token
router.post('/refresh', authController.requestToken);

// Lấy thông báo người dùng
router.get('/alert', middleware.verifyToken, authController.getNotify);

// Thêm / xóa bài viết vào mục đã lưu
router.post('/toggle/bookmark', middleware.verifyToken, authController.toggleBookmark);

// Cập nhật dữ liệu người dùng hiện tại
router.get('/current-user', middleware.verifyToken, authController.currentUser);

export default router;
