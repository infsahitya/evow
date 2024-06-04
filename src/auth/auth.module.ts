import { Module } from "@nestjs/common";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import GoogleOAuthStrategy from "./strategy/google-oauth.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtModule],
  providers: [AuthService, GoogleOAuthStrategy],
})
export default class AuthModule {}
