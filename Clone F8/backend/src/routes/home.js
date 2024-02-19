import { Router } from 'express';
import middleware from '../middleware/middleware';
import homeController from '../controllers/homeController';
import uploadAvatar from '../config/cloudinary.avatar';

const router = Router();

// Thêm mới 1 slideshow
router.post('/create', middleware.verifyTokenAndAdmin, uploadAvatar.single('image'), homeController.createNewSlideShow);

// Lấy tất cả slideshow
router.get('/slideshow', middleware.verifyTokenAndAdmin, homeController.getAllSlideShow);

// Thay đổi trạng thái của slide
router.post('/status', middleware.verifyTokenAndAdmin, homeController.toggleStatusSlide);

// Xóa slideshow
router.delete('/delete', middleware.verifyTokenAndAdmin, homeController.deleteSlideshow);

// Lấy dữ liệu trang chủ
router.get('/', homeController.getDataHomePage);

export default router;
