import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarCategoriaDto, CrearCategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async listarPublicas() {
    return this.prisma.categoria.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
    });
  }

  async listarTodas() {
    return this.prisma.categoria.findMany({ orderBy: { orden: 'asc' } });
  }

  async obtener(id: number) {
    const c = await this.prisma.categoria.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Categoría no encontrada');
    return c;
  }

  async crear(dto: CrearCategoriaDto) {
    const yaExiste = await this.prisma.categoria.findFirst({
      where: { OR: [{ nombre: dto.nombre }, { slug: dto.slug }] },
    });
    if (yaExiste) {
      throw new ConflictException('Ya existe una categoría con ese nombre o slug');
    }
    return this.prisma.categoria.create({ data: dto });
  }

  async actualizar(id: number, dto: ActualizarCategoriaDto) {
    await this.obtener(id);
    return this.prisma.categoria.update({ where: { id }, data: dto });
  }

  async eliminar(id: number) {
    await this.obtener(id);
    await this.prisma.categoria.delete({ where: { id } });
    return { ok: true };
  }
}
