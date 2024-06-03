import { Module } from "@nestjs/common";
import PrismaModule from "./shared/prisma/prisma.module";
import LoggerModule from "./shared/logger/logger.module";

@Module({
  imports: [PrismaModule, LoggerModule],
})
export class AppModule {}
