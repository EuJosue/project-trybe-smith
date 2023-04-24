import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import * as express from 'express';

const errorHandler = (error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export = errorHandler;