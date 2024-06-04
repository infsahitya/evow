import AuthService from "./auth.service";
import { Controller, Get, UseGuards } from "@nestjs/common";
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
}
