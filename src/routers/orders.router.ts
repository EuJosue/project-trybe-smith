import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validateToken from '../middlewares/validateToken';
import validateOrder from '../middlewares/validateOrder';

const productController = new OrderController();
const router = Router();

router.get('/', productController.findAll);

router.post('/', validateToken, validateOrder, productController.create);

export default router;