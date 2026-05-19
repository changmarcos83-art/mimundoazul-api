import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard que se pone sobre controllers/métodos para exigir login.
 *
 * Uso:
 *   @UseGuards(JwtAuthGuard)
 *   @Get('protegido')
 *   miMetodo(@CurrentUser() user) { ... }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
