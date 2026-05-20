import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarTestimonioDto, CrearTestimonioDto } from './dto/testimonio.dto';

@Injectable()
export class TestimoniosService {
  constructor(private readonly prisma: PrismaService) {}

  /** Lista para el sitio público (solo activos). */
  async listarPublicos() {
    return this.prisma.testimonio.findMany({
      where: { activo: true },
      orderBy: [{ orden: 'asc' }, { id: 'asc' }],
    });
  }

  /** Lista TODOS para el admin. */
  async listarTodos() {
    return this.prisma.testimonio.findMany({
      orderBy: [{ orden: 'asc' }, { id: 'asc' }],
    });
  }

  async obtener(id: number) {
    const t = await this.prisma.testimonio.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Testimonio no encontrado');
    return t;
  }

  async crear(dto: CrearTestimonioDto) {
    return this.prisma.testimonio.create({ data: dto });
  }

  async actualizar(id: number, dto: ActualizarTestimonioDto) {
    await this.obtener(id);
    return this.prisma.testimonio.update({ where: { id }, data: dto });
  }

  async eliminar(id: number) {
    await this.obtener(id);
    await this.prisma.testimonio.delete({ where: { id } });
    return { ok: true };
  }
}
