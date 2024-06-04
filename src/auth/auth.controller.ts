import AuthService from "./auth.service";
import { Controller, Get } from "@nestjs/common";

@Controller({
  path: "auth",
  version: "1",
})
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  trial() {
    return this.authService.trial();
  }
}
