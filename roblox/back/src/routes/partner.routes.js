import express from 'express';
import middleware from '../middleware';
import validatorPartner from '../validators/partner.validator';
import partnerController from '../controllers/partner.controller';

const router = express.Router();

router.get('/', middleware.verifyAdmin, partnerController.getPartners);

router.delete('/destroy', middleware.verifyAdmin, partnerController.destroyPartners);

router.put('/update', middleware.verifyAdmin, validatorPartner.updatePartners, partnerController.updatePartners);

router.post('/actions', middleware.verifyAdmin, validatorPartner.actionsPartners, partnerController.actionsPartners);

export default router;
