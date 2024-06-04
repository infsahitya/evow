import {
  Res,
  Req,
  Get,
  UseGuards,
  Controller,
  HttpStatus,
} from "@nestjs/common";
import AuthService from "./auth.service";
import GoogleOAuthGuard from "./guard/google-oauth.guard";

@Controller({
  path: "auth",
  version: "1",
})
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google-oauth20")
  @UseGuards(GoogleOAuthGuard)
  googleOAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleOAuthCallback(@Req() req, @Res() res) {
    const token = this.authService.signIn(req.user);

    res.cookie("access_token", token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }
}
