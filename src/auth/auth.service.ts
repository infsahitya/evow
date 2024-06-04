import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import configConstant from "src/constant/config.constant";
import LoggerService from "src/global/logger/logger.service";

@Injectable()
export default class AuthService {
  private configData: AuthConfigProps;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.configData = this.configService.get(configConstant.namespaces.AUTH);
  }

  trial() {
    this.loggerService.log(`Config Data - ${JSON.stringify(this.configData)}`);
    return this.configData;
  }
}
