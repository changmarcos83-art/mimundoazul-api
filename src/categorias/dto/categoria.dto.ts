import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearCategoriaDto {
  @IsString() @IsNotEmpty() nombre!: string;
  @IsString() @IsNotEmpty() slug!: string;
  @IsString() @IsOptional() icono?: string;
  @IsString() @IsOptional() descripcion?: string;
  @Type(() => Number) @IsInt() @IsOptional() orden?: number;
  @IsBoolean() @IsOptional() activo?: boolean;
}

export class ActualizarCategoriaDto {
  @IsString() @IsOptional() nombre?: string;
  @IsString() @IsOptional() slug?: string;
  @IsString() @IsOptional() icono?: string;
  @IsString() @IsOptional() descripcion?: string;
  @Type(() => Number) @IsInt() @IsOptional() orden?: number;
  @IsBoolean() @IsOptional() activo?: boolean;
}
