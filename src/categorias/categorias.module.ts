import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import {
  CategoriasPublicoController,
  CategoriasAdminController,
} from './categorias.controller';

@Module({
  controllers: [CategoriasPublicoController, CategoriasAdminController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
