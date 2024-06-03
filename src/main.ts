import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { VERSION_NEUTRAL, VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "debug", "fatal", "log", "verbose", "warn"],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  await app.listen(3000);
}
bootstrap();
