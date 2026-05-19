import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global de Prisma.
 *
 * @Global() significa que cualquier otro módulo de la app puede
 * inyectar PrismaService sin tener que importarlo explícitamente.
 * Es la práctica estándar para la conexión a DB.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
