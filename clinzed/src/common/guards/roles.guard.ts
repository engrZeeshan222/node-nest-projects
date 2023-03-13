import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../modules/user/entities/user.entity';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || roles.length < 1) {
      return true;
    }
    // const user = request.user; // it's undefined
    const request = context.switchToHttp().getRequest();
    const user = <User>request.user;
    if (user && user.role) {
      return roles.includes(user.role);
    } else {
      return false;
    }
  }
}
