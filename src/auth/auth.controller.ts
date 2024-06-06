import {
  Req,
  Get,
  Res,
  Inject,
  UseGuards,
  Controller,
  HttpStatus,
  VERSION_NEUTRAL,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Request, Response } from "express";
import envConfig from "src/config/env.config";
import authConfig from "src/config/auth.config";
import { parseDurationToSeconds } from "src/utils";
import GoogleOAuthGuard from "./guard/google.guard";
import LoggerService from "src/global/logger/logger.service";
import { AuthTokens } from "src/constant/token.constant";

interface GoogleOAuthRedirectRequest extends Request {
  user: ValidatedUserProps;
}

@Controller({
  path: "auth",
  version: VERSION_NEUTRAL,
})
export default class AuthController {
  private isProduction: boolean = false;

  constructor(
    private readonly loggerService: LoggerService,
    @Inject(envConfig.KEY)
    private readonly envConfigService: ConfigType<typeof envConfig>,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {
    this.isProduction = envConfigService.NODE_ENV === "production";
  }

  @Get("google-oauth20")
  @UseGuards(GoogleOAuthGuard)
  googleOAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleOAuthRedirect(
    @Req()
    req: GoogleOAuthRedirectRequest,
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

    delete user.accessToken;
    delete user.refreshToken;
    delete user.googleAccessToken;
    delete user.googleRefreshToken;

    this.loggerService.log(user, "Request User");

    res.status(HttpStatus.OK).send(user);
  }
}
