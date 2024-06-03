import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import PrismaModule from "./global/prisma/prisma.module";
import LoggerModule from "./global/logger/logger.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    PrismaModule,
  ],
})
export default class AppModule {}
