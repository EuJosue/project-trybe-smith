import { Router } from 'express';
import productsRouter from './products.router';
import usersRouter from './users.router';
import ordersRouter from './orders.router';
import loginRouter from './login.router';

const router = Router();

router.use('/products', productsRouter);

router.use('/users', usersRouter);

router.use('/orders', ordersRouter);

router.use('/login', loginRouter);

export default router;