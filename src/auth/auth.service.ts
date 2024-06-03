import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);
}
