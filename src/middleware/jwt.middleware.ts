import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokens } from "src/constant/token.constant";
import { NextFunction, Request, Response } from "express";

@Injectable()
export default class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const token: string = req.cookies[AuthTokens.ACCESS_TOKEN];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
      } catch (err) {
        return new UnauthorizedException("Not authorized");
      }
    } else {
      return new ForbiddenException("No token provided");
    }

    next();
  }
}
