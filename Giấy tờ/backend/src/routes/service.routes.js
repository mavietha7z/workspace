import express from 'express';
import serviceController from '../controllers/service.controller';
import serviceValidator from '../validators/service.validator';
import middleware from '../middleware';

const router = express.Router();

router.get('/', middleware.verifyAdmin, serviceController.getServices);

router.get('/details/:slug', middleware.verifyAdmin, serviceController.getDetailsServices);

router.post('/create', middleware.verifyAdmin, serviceValidator.createService, serviceController.createService);

router.put('/update', middleware.verifyAdmin, serviceValidator.createService, serviceController.updateService);

router.delete('/destroy', middleware.verifyAdmin, serviceController.destroyService);

export default router;
