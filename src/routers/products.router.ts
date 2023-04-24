import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productController = new ProductController();
const router = Router();

router.post('/', productController.create);

router.get('/', productController.findAll);

export default router;