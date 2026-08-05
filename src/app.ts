import express from 'express';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import profileRouter from './routes/profile.js';
import indexRouter from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/profile', profileRouter);
app.use('/', indexRouter);

export default app;
