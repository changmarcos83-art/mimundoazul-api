import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import {
  ProductosPublicoController,
  ProductosAdminController,
} from './productos.controller';

@Module({
  controllers: [ProductosPublicoController, ProductosAdminController],
  providers: [ProductosService],
})
export class ProductosModule {}
