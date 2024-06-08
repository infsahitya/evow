import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from "@nestjs/common";
import AppModule from "./app.module";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "debug", "fatal", "log", "verbose", "warn"],
  });

  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Evow")
    .setDescription(
      "Evow is a realtime system for bringing out collaboration between large number of people for event management related activities.",
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
