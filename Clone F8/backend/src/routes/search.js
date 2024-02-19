import { Router } from 'express';
import searchController from '../controllers/searchController';

const router = Router();

// Tìm khóa học theo tên
router.get('/', searchController.searchByName);

export default router;
