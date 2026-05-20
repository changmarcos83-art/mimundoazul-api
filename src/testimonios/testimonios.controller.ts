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
import { TestimoniosService } from './testimonios.service';
import { ActualizarTestimonioDto, CrearTestimonioDto } from './dto/testimonio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Público
@Controller('testimonios')
export class TestimoniosPublicoController {
  constructor(private readonly testimonios: TestimoniosService) {}

  @Get()
  listar() {
    return this.testimonios.listarPublicos();
  }
}

// Admin
@UseGuards(JwtAuthGuard)
@Controller('admin/testimonios')
export class TestimoniosAdminController {
  constructor(private readonly testimonios: TestimoniosService) {}

  @Get()
  listarTodos() {
    return this.testimonios.listarTodos();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.testimonios.obtener(id);
  }

  @Post()
  crear(@Body() dto: CrearTestimonioDto) {
    return this.testimonios.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarTestimonioDto) {
    return this.testimonios.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.testimonios.eliminar(id);
  }
}
