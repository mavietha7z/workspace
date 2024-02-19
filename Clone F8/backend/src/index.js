import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user';
import courseRouter from './routes/course';
import blogRouter from './routes/blog';
import videoRouter from './routes/video';
import imageRouter from './routes/image';
import learningRouter from './routes/learning';
import homeRouter from './routes/home';
import commentRouter from './routes/comment';
import authRouter from './routes/auth';
import lessonRouter from './routes/lesson';
import chapterRouter from './routes/chapter';
import searchRouter from './routes/search';

config();
const app = express();
app.use(
    cors({
        secure: false,
    })
);
app.use(helmet());

const port = 8080;

// Connect database
connect('mongodb://localhost:27017/backend-f8', () => {
    console.log('Connect database successfully');
});

// Config
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

// Create routes home
app.get('/', (req, res) => {
    res.send('Welcome to backend');
});

app.use('/api', blogRouter);

app.use('/api/home', homeRouter);

app.use('/api/auth', authRouter);

app.use('/api/user', userRouter);

app.use('/api/video', videoRouter);

app.use('/api/upload', imageRouter);

app.use('/api/lesson', lessonRouter);

app.use('/api/course', courseRouter);

app.use('/api/search', searchRouter);

app.use('/api/comment', commentRouter);

app.use('/api/chapter', chapterRouter);

app.use('/api/learning', learningRouter);

app.listen(port, () => {
    console.log('Listening on port', port);
});
