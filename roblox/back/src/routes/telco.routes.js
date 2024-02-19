import express from 'express';
import middleware from '../middleware';
import telcosValidator from '../validators/telco.validator';
import telcosController from '../controllers/telco.controller';

const router = express.Router();

// ADMIN telcos routes
router.delete('/destroy', middleware.verifyAdmin, telcosController.destroyTelco);

router.get('/', middleware.verifyAdmin, telcosValidator.getTelcos, telcosController.getTelcos);

router.post('/create', middleware.verifyAdmin, telcosValidator.telco, telcosController.createTelco);

router.put('/update', middleware.verifyAdmin, telcosValidator.updateTelco, telcosController.updateTelco);

router.post('/search', middleware.verifyAdmin, telcosValidator.searchTelcos, telcosController.searchTelcos);

router.post('/actions', middleware.verifyAdmin, telcosValidator.actionsTelcos, telcosController.actionsTelcos);

router.get('/players', telcosController.getTelcoByPlayers);

export default router;
