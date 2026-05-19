import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación automática con class-validator en TODOS los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // tira error si llegan campos extra
      transform: true,            // convierte tipos según los decoradores (@Type)
    }),
  );

  // Permite que el admin y el sitio público (en otros dominios) consuman la API.
  // FRONTEND_URL y ADMIN_URL pueden tener UNO o VARIOS dominios separados por coma.
  // Ej: FRONTEND_URL="https://www.miweb.com,https://miweb.com,https://preview.vercel.app"
  const parseOrigins = (v?: string) =>
    (v ?? '').split(',').map((s) => s.trim()).filter(Boolean);

  const origenesPermitidos = [
    ...parseOrigins(process.env.FRONTEND_URL),
    ...parseOrigins(process.env.ADMIN_URL),
    'http://localhost:3000',
    'http://localhost:3002',
  ];

  app.enableCors({
    origin: origenesPermitidos,
    credentials: true,
  });

  // Prefijo global — todos los endpoints quedan bajo /api/v1/*
  app.setGlobalPrefix('api/v1');

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  console.log(`🚀 API corriendo en http://localhost:${port}/api/v1`);
}
bootstrap();
