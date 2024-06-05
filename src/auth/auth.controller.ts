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
import AuthService from "./auth.service";
import { ConfigType } from "@nestjs/config";
import { Request, Response } from "express";
import authConfig from "src/config/auth.config";
import { parseDurationToSeconds } from "src/utils";
import GoogleOAuthGuard from "./guard/google-oauth.guard";

interface GoogleOAuthRedirectRequest extends Request {
  accessToken: string;
  refreshToken: string;
  user: ValidatedUserProps;
}

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
    req: GoogleOAuthRedirectRequest,
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
