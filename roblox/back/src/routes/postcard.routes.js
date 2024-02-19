import express from 'express';
import playerValidator from '../validators/player.validator';
import postCardController from '../controllers/postcard.controller';

const router = express.Router();

router.post('/v2', playerValidator.partner, postCardController.postCard);

export default router;
