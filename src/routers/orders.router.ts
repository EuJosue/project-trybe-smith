import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validateToken from '../middlewares/validateToken';

const productController = new OrderController();
const router = Router();

router.get('/', productController.findAll);

router.post('/', validateToken, productController.create);

export default router;