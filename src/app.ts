import express from 'express';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import profileRouter from './routes/profile.js';

const app = express();

app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/profile', profileRouter);

export default app;
