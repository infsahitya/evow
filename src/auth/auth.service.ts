import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService<
      AuthConfigProps & DbConfigProps
    >,
  ) {}

  trial() {
    return this.configService.get("google");
  }
}
