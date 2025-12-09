import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const [bearer, token] = authHeader.split(" ");

      if (bearer !== "Bearer" || !token) {
        return res.status(401).json({
          success: false,
          message: "Invalid token format",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      console.log(decoded);
      req.user = decoded;

      // Role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission!",
        });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }
  };
};

export default auth;
