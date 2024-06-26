import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import { ConfigService } from "@nestjs/config";
import AuthController from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import JwtStrategy from "./strategy/jwt.strategy";
import GoogleOAuthStrategy from "./strategy/google-oauth.strategy";
import UserModule from "src/shared/user/user.module";

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthService, GoogleOAuthStrategy, JwtStrategy],
})
export default class AuthModule {}
