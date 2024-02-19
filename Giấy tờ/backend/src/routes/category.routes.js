import express from 'express';
import categoryController from '../controllers/category.controller';
import categoryValidator from '../validators/category.validator';
import middleware from '../middleware';

const router = express.Router();

// ADMIN
router.get('/', middleware.verifyAdmin, categoryController.getCategories);

router.post('/create', middleware.verifyAdmin, categoryValidator.createCategory, categoryController.createCategory);

router.put('/update', middleware.verifyAdmin, categoryValidator.updateCategory, categoryController.updateCategory);

router.delete('/destroy', middleware.verifyAdmin, categoryController.destroyCategory);

router.put('/more-services', middleware.verifyAdmin, categoryController.moreServices);

router.post('/destroy-service', middleware.verifyAdmin, categoryController.removeService);

// CLIENT
router.get('/get-categories', categoryController.clientGetCategories);

export default router;
