import { Router } from 'express';
import UserController from '../controllers/user.controller';

const productController = new UserController();
const router = Router();

router.get('/', productController.login);

export default router;