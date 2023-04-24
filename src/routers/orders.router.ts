import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const productController = new OrderController();
const router = Router();

export default router;