import { Router } from 'express';
import middleware from '../middleware/middleware';
import validateBlog from '../validator/validateBlog';
import blogController from '../controllers/blogController';

const router = Router();

// Thêm mới bài viết mới
router.post('/posts/create', middleware.verifyToken, validateBlog.createPosts, blogController.createNewPosts);

// Lấy bài viết theo trang
router.get('/posts', middleware.veryAdminGetData, blogController.getPostsByPage);

// Bật tắt trạng thái bài viết
router.post('/posts/status', middleware.verifyTokenAndAdmin, blogController.toggleStatusPosts);

// Lấy bài viết theo slug
router.get('/posts/:slug', blogController.getPostBySlug);

// Xóa tất cả bài viết
router.delete('/posts/delete', middleware.verifyToken, blogController.deletePosts);

// Lấy tất cả bài viết của người dùng đã đăng
router.get('/my-posts', middleware.verifyToken, blogController.getMyPosts);

// Lấy bài viết theo chủ đề
router.get('/topic/:slug', blogController.getTopics);

// Yêu thích bài viết
router.post('/reaction', middleware.verifyToken, blogController.reactionPosts);

export default router;
