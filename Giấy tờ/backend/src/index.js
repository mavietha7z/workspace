import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

import viewEngine from './configs/view';
import userRouter from './routes/user.routes';
import settingRouter from './routes/setting.routes';
import categoryRouter from './routes/category.routes';
import serviceRouter from './routes/service.routes';

// Config
const port = 8080;
const app = express();
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

viewEngine(app);

// Connect database
connect('mongodb://localhost:27017/services');

app.use('/api/auth', userRouter);
app.use('/api/settings', settingRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/services', serviceRouter);

app.use('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
