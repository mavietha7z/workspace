import { Router } from 'express';
import middleware from '../middleware/middleware';
import videoController from '../controllers/videoController';

const router = Router();

// Lấy tất cả video
router.get('/', middleware.verifyTokenAndAdmin, videoController.getVideoByPage);

// Thêm mới video
router.post('/create', middleware.verifyTokenAndAdmin, videoController.createVideo);

// Xóa video
router.delete('/delete', middleware.verifyTokenAndAdmin, videoController.deleteVideo);

// Thay đổi trạng thái
router.post('/status', middleware.verifyTokenAndAdmin, videoController.toggleStatusChange);

// Cập nhật video
router.put('/update', middleware.verifyTokenAndAdmin, videoController.updateVideo);

export default router;
