import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import appConfig from './config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { validationFactory } from './common/pipes/validation-factory.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(appConfig().globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationFactory,
    }),
  );

  app.enableCors();
  app.use(cookieParser());
  app.use(helmet());

  /**
   * ===========================
   * Setup Swagger Documentation
   * ===========================
   */
  const config = new DocumentBuilder()
    .setTitle(appConfig().title)
    .setDescription(appConfig().description)
    .setVersion(appConfig().version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig().swaggerRoute, app, document);
  /**
   * ===========================
   * End Swagger Setup
   * ===========================
   */

  await app.listen(3000);
}
bootstrap();
