import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function initializeSwaggerDocumentation(
  app: INestApplication,
  swaggerPath: string,
) {
  const config = new DocumentBuilder()
    .setTitle('Integration API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerPath, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwaggerDocumentation(app, '/swagger');

  await app.listen(process.env.NODE_PORT ?? 3000);
}
bootstrap();
