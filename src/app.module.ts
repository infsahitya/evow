import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import PrismaService from "./shared/prisma/prisma.service";

@Module({
  providers: [AppService],
  imports: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
