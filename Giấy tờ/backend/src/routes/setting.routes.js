import express from 'express';
import settingController from '../controllers/setting.controller';
import middleware from '../middleware';

const router = express.Router();

router.post('/create', middleware.verifyAdmin, settingController.createSetting);

router.get('/', middleware.verifyAdmin, settingController.getSetting);

router.put('/update', middleware.verifyAdmin, settingController.updateSetting);

router.get('/home', middleware.verifyAdmin, settingController.getHomePage);

export default router;
