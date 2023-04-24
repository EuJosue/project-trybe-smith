import { NextFunction, Request, Response } from 'express';
import { Login } from '../interfaces/login.interface';
import { loginJoi } from './joi';

export default (req: Request, res: Response, next: NextFunction) => {
  const loginObject = req.body as Login;

  const { error } = loginJoi.validate(loginObject);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};