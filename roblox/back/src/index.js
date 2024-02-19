import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

import viewEngine from './configs/view';
import routerAuth from './routes/auth.routes';
import routerStat from './routes/stat.routes';
import routerTelcos from './routes/telco.routes';
import routerCharge from './routes/callback.routes';
import routerPartners from './routes/partner.routes';
import routerSettings from './routes/setting.routes';
import routerPostCard from './routes/postcard.routes';
import './configs/cron.check';
import './configs/cron.charging';

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
connect('mongodb://localhost:27017/roblox');

app.use('/charge', routerCharge);
app.use('/api/auth', routerAuth);
app.use('/api/telcos', routerTelcos);
app.use('/api/statistic', routerStat);
app.use('/api/partners', routerPartners);
app.use('/api/settings', routerSettings);
app.use('/api/chargingws', routerPostCard);

app.use('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Port ${port}`);
});
