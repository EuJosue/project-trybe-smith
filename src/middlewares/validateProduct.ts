import { NextFunction, Request, Response } from 'express';
import { productJoi } from './joi';
import { NewProduct } from '../interfaces/product.interface';
import statusCode from '../utils/statusCode';

export default (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as NewProduct;

  const { error } = productJoi.validate(product);

  if (error) {
    const { type } = error.details[0];

    return res.status(statusCode(type)).json({ message: error.message });
  }

  return next();
};