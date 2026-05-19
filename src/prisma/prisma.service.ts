import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Servicio único que envuelve a Prisma Client.
 *
 * - OnModuleInit: se conecta cuando NestJS arranca.
 * - OnModuleDestroy: se desconecta limpiamente al apagar la app.
 *
 * Otros servicios (productos, categorías, etc.) lo inyectan
 * por constructor para consultar la base de datos.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
