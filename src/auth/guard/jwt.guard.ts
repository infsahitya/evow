import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { GuardTokens } from "src/constant/guard.constant";
import { AuthTokens } from "src/constant/token.constant";

@Injectable()
export default class JwtGuard extends AuthGuard(GuardTokens.JWT) {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies[AuthTokens.ACCESS_TOKEN];
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
    return true;
  }
}
