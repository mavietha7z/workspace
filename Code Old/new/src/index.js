import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

import viewEngine from './configs/view';
import authRouter from './routes/auth.routes';
import websiteRouter from './routes/website.routes';
import postCardRouter from './routes/postcard.routes';
import postCardController from './controllers/postcard.controller';

// Config
const port = 8080;
const app = express();
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));

// Views
viewEngine(app);

// Connect database
connect('mongodb://localhost:27017/database-new');

// Routes
app.use('/', websiteRouter);
app.use('/api/auth', authRouter);
app.use('/chargingws', postCardRouter);
app.post('/charge/callback', postCardController.callbackPost);
app.use((req, res) => {
    res.render('not.ejs');
});

app.listen(port, () => {
    console.log(`Port ${port}`);
});
