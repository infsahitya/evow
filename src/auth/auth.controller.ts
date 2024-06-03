import AuthService from "./auth.service";
import { Controller, Get, Logger } from "@nestjs/common";

@Controller("auth")
export default class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get()
  trial() {
    return this.authService.trial();
  }
}
