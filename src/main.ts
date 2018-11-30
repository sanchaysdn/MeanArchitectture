import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      preflightContinue: false,
    }
  });
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('demo nestjs')
    .setDescription('demo nestjs Api description')
    .setVersion('1.0')
    .addTag('Demo nestjs API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(5171);
}
bootstrap();


