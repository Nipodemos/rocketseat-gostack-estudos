import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    console.log('decodedToken :>> ', decodedToken);
    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new Error('Invalid JWT Token');
  }
}
