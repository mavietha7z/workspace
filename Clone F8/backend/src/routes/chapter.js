import { Router } from 'express';
import middleware from '../middleware/middleware';
import chapterController from '../controllers/chapterController';

const router = Router();

// Thêm mới chương
router.post('/create', middleware.verifyTokenAndAdmin, chapterController.createChapter);

// Đổi tên chương
router.put('/rename', middleware.verifyTokenAndAdmin, chapterController.renameChapter);

// Xóa chương
router.delete('/delete', middleware.verifyTokenAndAdmin, chapterController.deleteChapter);

export default router;
