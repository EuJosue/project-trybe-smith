import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateUser from '../middlewares/validateUser';

const userController = new UserController();
const router = Router();

router.post('/', validateUser, userController.create);

export default router;