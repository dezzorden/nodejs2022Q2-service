import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize(), { cors: true });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Сервер Nest')
    .setDescription('Документация по REST API')
    .setVersion('0.0.1')
    .build();
  const API_DOCS = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(API_DOCS);
  SwaggerModule.setup('/api/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log('Server started on port: ' + PORT));
}

bootstrap();
