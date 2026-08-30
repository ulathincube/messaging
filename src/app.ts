import express from 'express';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import profileRouter from './routes/profile.js';
import indexRouter from './routes/index.js';
import cors from 'cors';
import notFound from './errors/notFound.js';
import errorHandler from './errors/errorHandler.js';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from './lib/prisma.js';
import { SESSION_SECRET } from './utils/constants.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

if (!SESSION_SECRET) throw new Error('Session Secret is undefined!');

const app = express();
const ONE_HOUR = 60 * 1000 * 60;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: ONE_HOUR,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: ONE_HOUR,
      dbRecordIdIsSessionId: true,
    }),
  }),
);

app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/profile', profileRouter);
app.use('/api/', indexRouter);

app.use(notFound);
app.use(errorHandler);

// Socket.io implementation
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', socket => {
//   console.log({ socket });
// });

export default app;
