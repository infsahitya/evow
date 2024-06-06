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
import authConfig from "src/config/auth.config";
import { parseDurationToSeconds } from "src/utils";
import GoogleOAuthGuard from "./guard/google-oauth.guard";
import LoggerService from "src/global/logger/logger.service";

interface GoogleOAuthRedirectRequest extends Request {
  user: ValidatedUserProps;
}

@Controller({
  path: "auth",
  version: VERSION_NEUTRAL,
})
export default class AuthController {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {}

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

    res.cookie("access_token", user.accessToken, {
      httpOnly: true,
      // secure: true, /* will be enabled for HTTPS connection only */
      maxAge: parseDurationToSeconds(this.authConfigService.jwt.accessTokenExp),
    });

    res.cookie("refresh_token", user.refreshToken, {
      httpOnly: true,
      // secure: true, /* will be enabled for HTTPS connection only */
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
