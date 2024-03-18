import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const varifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth token"];
  if (!token) {
    return res.status(400).json({ message: "Unathorized token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "unathorized" });
  }
};

export default varifyToken;
