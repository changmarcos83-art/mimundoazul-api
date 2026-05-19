import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador para extraer el admin del request actual.
 *
 * Uso:
 *   miMetodo(@CurrentUser() user: { id: number; email: string }) {
 *     return user.id;
 *   }
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
