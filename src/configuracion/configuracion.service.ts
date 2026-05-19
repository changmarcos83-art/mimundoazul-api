import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConfiguracionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Devuelve TODAS las configuraciones como un objeto {clave: valor}.
   * Es lo que consume el sitio público — un GET y tiene todo.
   */
  async listar(): Promise<Record<string, string>> {
    const filas = await this.prisma.configuracion.findMany();
    const resultado: Record<string, string> = {};
    for (const f of filas) resultado[f.clave] = f.valor;
    return resultado;
  }

  /**
   * Lista en formato detallado (con descripciones) — para el admin.
   */
  async listarDetallado() {
    return this.prisma.configuracion.findMany({ orderBy: { clave: 'asc' } });
  }

  /**
   * Actualiza VARIAS claves de configuración al mismo tiempo.
   * Si la clave no existía, la crea. Si existía, la actualiza.
   *
   * Ejemplo body: { whatsapp_numero: "...", email_contacto: "..." }
   */
  async actualizar(cambios: Record<string, string>) {
    const operaciones = Object.entries(cambios).map(([clave, valor]) =>
      this.prisma.configuracion.upsert({
        where: { clave },
        update: { valor },
        create: { clave, valor },
      }),
    );
    await this.prisma.$transaction(operaciones);
    return this.listar();
  }
}
