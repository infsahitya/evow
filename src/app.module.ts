import { Module } from "@nestjs/common";
import dbConfig from "./config/db.config";
import AuthModule from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import authConfig from "./config/auth.config";
import PrismaModule from "./global/prisma/prisma.module";
import LoggerModule from "./global/logger/logger.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, authConfig],
    }),
    LoggerModule,
    PrismaModule,
    AuthModule,
  ],
})
export default class AppModule {}
