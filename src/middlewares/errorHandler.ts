import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export = errorHandler;