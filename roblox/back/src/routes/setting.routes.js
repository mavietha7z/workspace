import express from 'express';
import middleware from '../middleware';
import settingController from '../controllers/setting.controller';

const router = express.Router();

router.get('/', middleware.verifyAdmin, settingController.getSettings);

router.put('/update', middleware.verifyAdmin, settingController.updateSetting);

router.post('/create', middleware.verifyAdmin, settingController.createSetting);

router.delete('/destroy-data', middleware.verifyAdmin, settingController.destroyData);

export default router;
