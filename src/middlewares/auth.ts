import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SessionRequest } from '../utils/types';

const extractBearerToken = (header: string) => header.replace('Bearer', '');

const handleAuthError = (res: Response) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
