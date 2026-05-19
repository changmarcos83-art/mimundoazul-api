import { Module } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import {
  ConfiguracionPublicoController,
  ConfiguracionAdminController,
} from './configuracion.controller';

@Module({
  controllers: [ConfiguracionPublicoController, ConfiguracionAdminController],
  providers: [ConfiguracionService],
})
export class ConfiguracionModule {}
