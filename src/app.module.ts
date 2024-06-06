import dbConfig from "./config/db.config";
import AuthModule from "./auth/auth.module";
import envConfig from "./config/env.config";
import authConfig from "./config/auth.config";
import { Inject, Module } from "@nestjs/common";
import PrismaModule from "./global/prisma/prisma.module";
import LoggerModule from "./global/logger/logger.module";
import LoggerService from "./global/logger/logger.service";
import { ConfigModule, ConfigType } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      load: [envConfig, dbConfig, authConfig],
    }),
    LoggerModule,
    PrismaModule,
    AuthModule,
  ],
})
export default class AppModule {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject(envConfig.KEY)
    private readonly envConfigService: ConfigType<typeof envConfig>,
  ) {
    this.loggerService.log(envConfigService.NODE_ENV, "NODE_ENV");
  }
}
