import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import { ConfigService } from "@nestjs/config";
import AuthController from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import GoogleOAuthStrategy from "./strategy/google-oauth.strategy";

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
  ],
  providers: [AuthService, GoogleOAuthStrategy],
})
export default class AuthModule {}
