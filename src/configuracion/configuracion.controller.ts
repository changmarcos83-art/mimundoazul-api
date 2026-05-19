import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Público — devuelve TODO como objeto {clave: valor}
@Controller('configuracion')
export class ConfiguracionPublicoController {
  constructor(private readonly config: ConfiguracionService) {}

  @Get()
  obtenerTodo() {
    return this.config.listar();
  }
}

// Admin — para editar
@UseGuards(JwtAuthGuard)
@Controller('admin/configuracion')
export class ConfiguracionAdminController {
  constructor(private readonly config: ConfiguracionService) {}

  @Get()
  listarDetallado() {
    return this.config.listarDetallado();
  }

  /**
   * PATCH /admin/configuracion
   * Body: { whatsapp_numero: "...", email_contacto: "...", ... }
   * Cualquier subconjunto de claves.
   */
  @Patch()
  actualizar(@Body() cambios: Record<string, string>) {
    return this.config.actualizar(cambios);
  }
}
