import {
  Req,
  Get,
  UseGuards,
  Controller,
  VERSION_NEUTRAL,
} from "@nestjs/common";
import AuthService from "./auth.service";
import GoogleOAuthGuard from "./guard/google-oauth.guard";

@Controller({
  path: "auth",
  version: VERSION_NEUTRAL,
})
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google-oauth20")
  @UseGuards(GoogleOAuthGuard)
  googleOAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleOAuthRedirect(@Req() req: Request & { user: any }) {
    const token = this.authService.signIn(req.user);

    return token;
  }
}
