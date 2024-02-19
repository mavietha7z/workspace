import { Router } from 'express';
import middleware from '../middleware/middleware';
import commentController from '../controllers/commentController';

const router = Router();

// Lấy tất cả comment theo uid bài
router.get('/', middleware.verifyToken, commentController.getAllComments);

// Lấy comment trả lời theo uid comment
router.get('/replies', middleware.verifyToken, commentController.getCommentReplies);

// Thêm mới bình luận
router.post('/create', middleware.verifyToken, commentController.createComment);

// Trả lời bình luận
router.post('/reply', middleware.verifyToken, commentController.replyComment);

export default router;
