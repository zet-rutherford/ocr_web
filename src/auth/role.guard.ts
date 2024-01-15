import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    console.log('RolesGuard');
    const requiredRole = this.reflector.getAllAndOverride<string[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }
    console.log('requiredRoles=> ', requiredRole);
    const { user } = context.switchToHttp().getRequest();
    console.log('user =>', user);

    return requiredRole.some((role) => user.role.split(',').includes(role));
  }
}
