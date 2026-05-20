import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { TestimoniosModule } from './testimonios/testimonios.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductosModule,
    CategoriasModule,
    ConfiguracionModule,
    TestimoniosModule,
    UploadsModule,
  ],
})
export class AppModule {}
