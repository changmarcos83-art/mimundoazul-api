import { Module } from '@nestjs/common';
import { TestimoniosService } from './testimonios.service';
import {
  TestimoniosPublicoController,
  TestimoniosAdminController,
} from './testimonios.controller';

@Module({
  controllers: [TestimoniosPublicoController, TestimoniosAdminController],
  providers: [TestimoniosService],
})
export class TestimoniosModule {}
