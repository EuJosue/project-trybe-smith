import { NextFunction, Request, Response } from 'express';
import { userJoi } from './joi';
import statusCode from '../utils/statusCode';
import { NewUser } from '../interfaces/user.interface';

export default (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as NewUser;

  const { error } = userJoi.validate(user);

  if (error) {
    const { type } = error.details[0];

    return res.status(statusCode(type)).json({ message: error.message });
  }

  return next();
};