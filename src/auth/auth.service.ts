import { ConfigService } from "@nestjs/config";
import { Injectable, Logger } from "@nestjs/common";
import configConstant from "src/constant/config.constant";

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private configData: AuthConfigProps;

  constructor(private readonly configService: ConfigService) {
    this.configData = this.configService.get(configConstant.namespaces.AUTH);
  }

  trial() {
    this.logger.log(`Config Data - ${JSON.stringify(this.configData)}`);
    return this.configData;
  }
}
