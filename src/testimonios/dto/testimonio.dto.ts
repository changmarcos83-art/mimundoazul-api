import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

const toNumberOrNull = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined || value === '') return null;
  return Number(value);
};

export class CrearTestimonioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsString()
  @IsOptional()
  relacion?: string | null;

  @IsString()
  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  mensaje!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  estrellas?: number;

  @IsString()
  @IsOptional()
  avatarUrl?: string | null;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  orden?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

export class ActualizarTestimonioDto {
  @IsString() @IsOptional() nombre?: string;
  @IsString() @IsOptional() relacion?: string | null;
  @IsString() @IsOptional() mensaje?: string;

  @Type(() => Number) @IsInt() @Min(1) @Max(5) @IsOptional()
  estrellas?: number;

  @IsString() @IsOptional() avatarUrl?: string | null;
  @Transform(toNumberOrNull) @IsInt() @IsOptional() orden?: number | null;
  @IsBoolean() @IsOptional() activo?: boolean;
}
