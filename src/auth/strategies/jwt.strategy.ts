import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

interface JwtPayload {
  sub: number; // id del admin
  email: string;
}

/**
 * Estrategia JWT de Passport.
 *
 * Cuando un request llega con el header "Authorization: Bearer xxx",
 * Passport extrae el token, lo valida con JWT_SECRET, y llama a validate()
 * con el payload decodificado.
 *
 * Devuelve el admin que se adjunta a req.user.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'fallback-secret',
    });
  }

  async validate(payload: JwtPayload) {
    const admin = await this.prisma.adminUser.findUnique({
      where: { id: payload.sub },
    });
    if (!admin || !admin.activo) {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    // Lo que devuelva acá va a quedar en req.user
    return { id: admin.id, email: admin.email, nombre: admin.nombre };
  }
}
