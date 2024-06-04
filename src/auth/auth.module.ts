import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import GoogleOAuthStrategy from "./strategy/google-oauth.strategy";

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtModule],
  providers: [AuthService, GoogleOAuthStrategy],
})
export default class AuthModule {}
