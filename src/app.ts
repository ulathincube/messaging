import express from 'express';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import profileRouter from './routes/profile.js';
import indexRouter from './routes/index.js';
import cors from 'cors';
import notFound from './errors/notFound.js';
import errorHandler from './errors/errorHandler.js';
import session from 'express-session';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'hello-world',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  }),
);

app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/profile', profileRouter);
app.use('/', indexRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
