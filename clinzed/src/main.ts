import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Clinzed')
    .setDescription('Clinzed api collection')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, document);
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
}
bootstrap();
