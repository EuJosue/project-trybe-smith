import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/validateLogin';

const productController = new UserController();
const router = Router();

router.post('/', validateLogin, productController.login);

export default router;