import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth/jwt';

type Middleware = (
  req: Request & { user?: number },
  res: Response,
  next: NextFunction,
) => void;

const validateToken: Middleware = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decoded = verifyToken(token);

  req.user = decoded || 0;

  next();
};

export = validateToken;