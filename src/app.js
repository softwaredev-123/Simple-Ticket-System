import express from 'express';
import healthRouter from './routes/health.route.js';
import authRouter from './routes/auth.route.js';
import eventRouter from './routes/event.route.js';
import orderRouter from './routes/order.route.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/', healthRouter);
app.use('/auth', authRouter);
app.use('/events', eventRouter);
app.use('/orders', orderRouter);

app.use(errorMiddleware);

export default app;
