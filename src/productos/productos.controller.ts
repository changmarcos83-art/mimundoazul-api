import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ActualizarProductoDto, CrearProductoDto } from './dto/producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// ============================================================
// CONTROLLER PÚBLICO — no requiere login
// ============================================================
@Controller('productos')
export class ProductosPublicoController {
  constructor(private readonly productos: ProductosService) {}

  /**
   * GET /productos
   * Query opcionales: ?categoriaId=1  ?destacado=true
   */
  @Get()
  listar(
    @Query('categoriaId') categoriaId?: string,
    @Query('destacado') destacado?: string,
  ) {
    return this.productos.listarPublicos({
      categoriaId: categoriaId ? Number(categoriaId) : undefined,
      destacado: destacado === 'true' ? true : destacado === 'false' ? false : undefined,
    });
  }

  /**
   * GET /productos/:id
   */
  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.productos.obtener(id);
  }
}

// ============================================================
// CONTROLLER ADMIN — requiere JWT
// ============================================================
@UseGuards(JwtAuthGuard)
@Controller('admin/productos')
export class ProductosAdminController {
  constructor(private readonly productos: ProductosService) {}

  @Get()
  listarTodos() {
    return this.productos.listarTodos();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.productos.obtener(id);
  }

  @Post()
  crear(@Body() dto: CrearProductoDto) {
    return this.productos.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarProductoDto) {
    return this.productos.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.productos.eliminar(id);
  }
}
