import {
  Req,
  Get,
  Res,
  UseGuards,
  Controller,
  VERSION_NEUTRAL,
  Inject,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import AuthService from "./auth.service";
import GoogleOAuthGuard from "./guard/google-oauth.guard";
import authConfig from "src/config/auth.config";
import { ConfigType } from "@nestjs/config";
import { parseDurationToSeconds } from "src/utils";

@Controller({
  path: "auth",
  version: VERSION_NEUTRAL,
})
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
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
    req: Request & {
      accessToken: string;
      refreshToken: string;
      user: ValidatedUserProps;
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie("access_token", req.accessToken, {
      httpOnly: true,
      maxAge: parseDurationToSeconds(this.authConfigService.jwt.accessTokenExp),
    });
    res.cookie("refresh_token", req.refreshToken, {
      httpOnly: true,
      maxAge: parseDurationToSeconds(
        this.authConfigService.jwt.refreshTokenExp,
      ),
    });
    res.status(HttpStatus.OK).send(req.user);
  }
}
