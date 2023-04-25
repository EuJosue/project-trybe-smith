import { NextFunction, Request, Response } from 'express';
import { Login } from '../interfaces/login.interface';
import { loginJoi } from './joi';
import statusCode from '../utils/statusCode';

export default (req: Request, res: Response, next: NextFunction) => {
  const loginObject = req.body as Login;

  const { error } = loginJoi.validate(loginObject);

  if (error) {
    const { type } = error.details[0];

    return res.status(statusCode(type)).json({ message: error.message });
  }

  return next();
};