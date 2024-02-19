import express from 'express';
import postCardService from '../services/postcard.service';
import postCardController from '../controllers/postcard.controller';

const router = express.Router();

router.post('/v2', postCardService.validateCard, postCardController.postCard);

export default router;
