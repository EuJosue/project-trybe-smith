import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validateProduct from '../middlewares/validateProduct';

const productController = new ProductController();
const router = Router();

router.post('/', validateProduct, productController.create);

router.get('/', productController.findAll);

export default router;