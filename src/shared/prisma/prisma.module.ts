import { Module } from "@nestjs/common";
import PrismaService from "./prisma.service";

@Module({
  controllers: [],
  exports: [PrismaService],
  providers: [PrismaService],
})
export default class PrismaModule {}
