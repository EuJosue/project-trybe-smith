import { NextFunction, Request, Response } from 'express';
import { orderJoi } from './joi';
import statusCode from '../utils/statusCode';
import { NewOrder } from '../interfaces/order.interface';

export default (req: Request, res: Response, next: NextFunction) => {
  const { productsIds } = req.body as NewOrder;

  const { error } = orderJoi.validate(productsIds);

  if (error) {
    const { type } = error.details[0];

    return res.status(statusCode(type)).json({ message: error.message });
  }

  return next();
};