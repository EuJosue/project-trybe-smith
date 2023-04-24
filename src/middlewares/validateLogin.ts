import { NextFunction, Request, Response } from 'express';
import { Login } from '../interfaces/login.interface';

export default (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as Login;

  if (!username || !password) {
    return res.status(400).json({ message: `"${username ? 'password' : 'username'}" is required` });
  }

  return next();
};