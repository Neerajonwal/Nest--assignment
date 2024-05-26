// main.ts or any file where you configure Swagger
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Your API Documentation')
    .setDescription('API documentation for your NestJS application')
    .setVersion('1.0')
    .addTag('users')
    .addTag('wallet-addresses')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // Update this to your actual domain
    // For example, if your application is hosted at nest-assignment.onrender.com,
    // then set this to 'nest-assignment.onrender.com'
    // This ensures that the Swagger documentation links are correct
    host: 'nest-assignment.onrender.com',
  });

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
