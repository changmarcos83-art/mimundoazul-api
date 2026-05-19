import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { ActualizarCategoriaDto, CrearCategoriaDto } from './dto/categoria.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Público
@Controller('categorias')
export class CategoriasPublicoController {
  constructor(private readonly categorias: CategoriasService) {}

  @Get()
  listar() {
    return this.categorias.listarPublicas();
  }
}

// Admin
@UseGuards(JwtAuthGuard)
@Controller('admin/categorias')
export class CategoriasAdminController {
  constructor(private readonly categorias: CategoriasService) {}

  @Get()
  listarTodas() {
    return this.categorias.listarTodas();
  }

  @Post()
  crear(@Body() dto: CrearCategoriaDto) {
    return this.categorias.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarCategoriaDto) {
    return this.categorias.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.categorias.eliminar(id);
  }
}
