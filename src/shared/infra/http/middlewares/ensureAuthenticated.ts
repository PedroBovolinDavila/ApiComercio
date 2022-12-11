import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayloadJWT {
  iat: number
  ext: number
  sub: string
}

function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {

    const decode = verify(token, auth.jwt.secret)
    
    const { sub } = decode as IPayloadJWT

    req.userId = sub

    return next()

  } catch (err) {
    console.log(err);
    
    throw new AppError('Invalid JWT token', 401)
  }
}

export { ensureAuthenticated }