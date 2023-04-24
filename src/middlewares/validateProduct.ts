import { NextFunction, Request, Response } from 'express';
import { productJoi } from './joi';
import { NewProduct } from '../interfaces/product.interface';

const statusCode = (type: string) => {
  switch (type) {
    case 'any.required':
      return 400;
    case 'string.min':
    case 'string.base':
      return 422;
    default:
      return 500;
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as NewProduct;

  const { error } = productJoi.validate(product);

  if (error) {
    const { type } = error.details[0];

    return res.status(statusCode(type)).json({ message: error.message });
  }

  return next();
};