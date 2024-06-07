import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { GuardTokens } from "src/constant/guard.constant";

@Injectable()
export default class JwtGuard extends AuthGuard(GuardTokens.JWT) {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
}
