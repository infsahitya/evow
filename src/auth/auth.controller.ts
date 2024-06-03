import { Controller, Logger } from "@nestjs/common";
import AuthService from "./auth.service";

@Controller("auth")
export default class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}
}
