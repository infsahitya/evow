import { ConfigService } from "@nestjs/config";
import { Injectable, Logger } from "@nestjs/common";
import configConstant from "src/constant/config.constant";

@Injectable()
export default class AuthService {
  private configData: AuthConfigProps;
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly configService: ConfigService) {
    this.configData = this.configService.get(configConstant.namespaces.AUTH);
  }

  trial() {
    return this.configData;
  }
}
