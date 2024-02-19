import express from 'express';
import middleware from '../middleware';
import statValidator from '../validators/stat.validator';
import statController from '../controllers/stat.controller';

const router = express.Router();

router.get('/daily-stats', middleware.verifyAdmin, statController.getDailyStats);

router.get('/total-chargings', middleware.verifyAdmin, statController.getTotalChargings);

router.get('/chargings', middleware.verifyAdmin, statValidator.getChargings, statController.getChargings);

router.get('/users-yield', middleware.verifyAdmin, statValidator.checkPage, statController.getUsersYield);

export default router;
