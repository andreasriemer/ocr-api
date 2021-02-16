import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://0.0.0.0:3000',
  'http://0.0.0.0:3001',
  'https://0.0.0.0:3000',
  'https://0.0.0.0:3001',
  'http://192.168.178.21:3000',
  'http://192.168.178.21:3001',
  'https://192.168.178.21:3000',
  'https://192.168.178.21:3001',
  'https://192.168.178.26:3000',
  'https://192.168.178.26:3001',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: whitelist,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'UPDATE', 'OPTIONS'],
    preflightContinue: false,
    credentials: true,
  });
  await app.listen(config.PORT);
}
bootstrap();
