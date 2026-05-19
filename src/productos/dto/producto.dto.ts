import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearProductoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'El SKU es obligatorio' })
  sku!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio inválido' })
  @Min(0)
  precio!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  precioPromo?: number;

  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  edadMin?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  edadMax?: number;

  @IsBoolean()
  @IsOptional()
  destacado?: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  orden?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  categoriaId?: number;
}

// Para actualizar, todos los campos son opcionales
export class ActualizarProductoDto {
  @IsString() @IsOptional() nombre?: string;
  @IsString() @IsOptional() sku?: string;
  @IsString() @IsOptional() descripcion?: string;

  @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @IsOptional()
  precio?: number;

  @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @IsOptional()
  precioPromo?: number;

  @IsString() @IsOptional() imagenUrl?: string;
  @Type(() => Number) @IsInt() @Min(0) @IsOptional() stock?: number;
  @Type(() => Number) @IsInt() @IsOptional() edadMin?: number;
  @Type(() => Number) @IsInt() @IsOptional() edadMax?: number;
  @IsBoolean() @IsOptional() destacado?: boolean;
  @IsBoolean() @IsOptional() activo?: boolean;
  @Type(() => Number) @IsInt() @IsOptional() orden?: number;
  @Type(() => Number) @IsInt() @IsOptional() categoriaId?: number;
}
