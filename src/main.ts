import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize(), { cors: true });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Сервер Nest')
    .setDescription('Документация по REST API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log('Server started on port: ' + PORT));
}

bootstrap();
