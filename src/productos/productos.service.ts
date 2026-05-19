import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActualizarProductoDto, CrearProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista los productos visibles para el público.
   * Opcionalmente filtra por categoría y por "destacados".
   */
  async listarPublicos(opciones?: { categoriaId?: number; destacado?: boolean }) {
    return this.prisma.producto.findMany({
      where: {
        activo: true,
        ...(opciones?.categoriaId ? { categoriaId: opciones.categoriaId } : {}),
        ...(opciones?.destacado !== undefined ? { destacado: opciones.destacado } : {}),
      },
      orderBy: [{ orden: 'asc' }, { id: 'asc' }],
      include: { categoria: true },
    });
  }

  /**
   * Lista TODOS los productos (incluso inactivos) — para el admin.
   */
  async listarTodos() {
    return this.prisma.producto.findMany({
      orderBy: [{ orden: 'asc' }, { id: 'asc' }],
      include: { categoria: true },
    });
  }

  async obtener(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: { categoria: true },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async crear(dto: CrearProductoDto) {
    const existente = await this.prisma.producto.findUnique({ where: { sku: dto.sku } });
    if (existente) {
      throw new ConflictException(`Ya existe un producto con SKU: ${dto.sku}`);
    }
    return this.prisma.producto.create({ data: dto });
  }

  async actualizar(id: number, dto: ActualizarProductoDto) {
    await this.obtener(id); // valida que existe
    return this.prisma.producto.update({
      where: { id },
      data: dto,
    });
  }

  async eliminar(id: number) {
    await this.obtener(id);
    await this.prisma.producto.delete({ where: { id } });
    return { ok: true };
  }
}
