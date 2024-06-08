import {
  Req,
  Get,
  Res,
  Post,
  Body,
  Inject,
  UseGuards,
  Controller,
  HttpStatus,
  VERSION_NEUTRAL,
} from "@nestjs/common";
import { Response } from "express";
import AuthService from "./auth.service";
import { ConfigType } from "@nestjs/config";
import envConfig from "src/config/env.config";
import authConfig from "src/config/auth.config";
import { parseDurationToSeconds } from "src/utils";
import GoogleOAuthGuard from "./guard/google.guard";
import EmailLoginDTO from "./model/email-login.dto";
import EmailSignupDTO from "./model/email-signup.dto";
import { AuthTokens } from "src/constant/token.constant";
import LoggerService from "src/global/logger/logger.service";

@Controller({
  path: "auth",
  version: VERSION_NEUTRAL,
})
export default class AuthController {
  private isProduction: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
    @Inject(envConfig.KEY)
    private readonly envConfigService: ConfigType<typeof envConfig>,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {
    this.isProduction = envConfigService.NODE_ENV === "production";
  }

  @Post("login/email")
  emailLogin(@Body() body: EmailLoginDTO) {
    return `Login using email ${body}`;
  }

  @Post("signup/email")
  emailSignup(@Body() body: EmailSignupDTO) {
    return this.authService.emailSignup(body);
  }

  @Get("google-oauth20")
  @UseGuards(GoogleOAuthGuard)
  googleOAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleOAuthRedirect(
    @Req()
    req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user } = req;

    res.cookie(AuthTokens.ACCESS_TOKEN, user.accessToken, {
      httpOnly: true,
      secure: this.isProduction /* will be enabled for HTTPS connection only */,
      maxAge: parseDurationToSeconds(this.authConfigService.jwt.accessTokenExp),
    });

    res.cookie(AuthTokens.REFRESH_TOKEN, user.refreshToken, {
      httpOnly: true,
      secure: this.isProduction /* will be enabled for HTTPS connection only */,
      maxAge: parseDurationToSeconds(
        this.authConfigService.jwt.refreshTokenExp,
      ),
    });

    // delete user.accessToken;
    delete user.refreshToken;
    delete user.googleAccessToken;
    delete user.googleRefreshToken;

    this.loggerService.log(user, "Request User");

    res.status(HttpStatus.OK).send(user);
  }
}
