import { Module } from "@nestjs/common";
import PrismaService from "./shared/prisma/prisma.service";

@Module({
  providers: [],
  controllers: [],
  imports: [PrismaService],
})
export class AppModule {}
