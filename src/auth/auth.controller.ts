import AuthService from "./auth.service";
import { Controller, Get, Logger, VERSION_NEUTRAL } from "@nestjs/common";

@Controller({
  path: "auth",
  version: VERSION_NEUTRAL,
})
export default class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get()
  trial() {
    return this.authService.trial();
  }
}
