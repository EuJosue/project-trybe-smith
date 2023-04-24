import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/validateLogin';

const userController = new UserController();
const router = Router();

router.post('/', validateLogin, userController.login);

export default router;