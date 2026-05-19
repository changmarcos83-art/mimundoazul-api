import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email es obligatorio' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Contraseña es obligatoria' })
  password!: string;
}
