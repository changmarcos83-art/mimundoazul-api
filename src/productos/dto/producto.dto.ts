import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

/**
 * Convierte el valor a Number, pero PRESERVA null/undefined.
 * Útil para campos opcionales: si el admin manda null, queremos
 * guardar null (Prisma borra el valor anterior), no convertir a 0.
 */
const toNumberOrNull = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined || value === '') return null;
  return Number(value);
};

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

  @Transform(toNumberOrNull)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  precioPromo?: number | null;

  @IsString()
  @IsOptional()
  imagenUrl?: string | null;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @Transform(toNumberOrNull)
  @IsInt()
  @IsOptional()
  edadMin?: number | null;

  @Transform(toNumberOrNull)
  @IsInt()
  @IsOptional()
  edadMax?: number | null;

  @IsBoolean()
  @IsOptional()
  destacado?: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsBoolean()
  @IsOptional()
  agotado?: boolean;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  orden?: number;

  @Transform(toNumberOrNull)
  @IsInt()
  @IsOptional()
  categoriaId?: number | null;
}

// Para actualizar, todos los campos son opcionales.
// Campos OPCIONALES que pueden venir como null para borrarlos:
//   precioPromo, imagenUrl, edadMin, edadMax, categoriaId
export class ActualizarProductoDto {
  @IsString() @IsOptional() nombre?: string;
  @IsString() @IsOptional() sku?: string;
  @IsString() @IsOptional() descripcion?: string | null;

  @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @IsOptional()
  precio?: number;

  @Transform(toNumberOrNull) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @IsOptional()
  precioPromo?: number | null;

  @IsString() @IsOptional() imagenUrl?: string | null;
  @Type(() => Number) @IsInt() @Min(0) @IsOptional() stock?: number;
  @Transform(toNumberOrNull) @IsInt() @IsOptional() edadMin?: number | null;
  @Transform(toNumberOrNull) @IsInt() @IsOptional() edadMax?: number | null;
  @IsBoolean() @IsOptional() destacado?: boolean;
  @IsBoolean() @IsOptional() activo?: boolean;
  @IsBoolean() @IsOptional() agotado?: boolean;
  @Type(() => Number) @IsInt() @IsOptional() orden?: number;
  @Transform(toNumberOrNull) @IsInt() @IsOptional() categoriaId?: number | null;
}
