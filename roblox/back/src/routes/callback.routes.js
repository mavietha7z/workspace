import express from 'express';
import postCardController from '../controllers/postcard.controller';

const router = express.Router();

router.post('/callback', postCardController.callback);

export default router;
