import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasPermission = requiredPermissions.some((perm) => user.permissions.includes(perm));
    if (!hasPermission) {
      throw new ForbiddenException('Access Denied');
    }
    return true;
  }
}
