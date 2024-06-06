import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class JwtMiddleware {
  constructor(private readonly jwtService: JwtService) {}
}
