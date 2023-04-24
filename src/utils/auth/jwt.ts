import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (user: { id:number }) => {
  const token = jwt.sign({ id: user.id }, secret, jwtConfig);

  return token;
};

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

const decodeToken = (token: string) => {
  const decoded = jwt.decode(token, { complete: true });
  return decoded;
};

const functions = {
  generateToken,
  verifyToken,
  decodeToken,
};

export = functions;