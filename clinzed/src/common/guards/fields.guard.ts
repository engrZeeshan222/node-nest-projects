import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
@Injectable()
export class FieldGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const fields = this.reflector.get<string[]>('fields', context.getHandler());

    const request = context.switchToHttp().getRequest();
    if (!fields || fields.length < 1) {
      return true;
    }
    fields.forEach((element) => {
      if (request.body[element]) {
        throw new HttpException(
          `You are not allowed to set this field ${element}`,
          HttpStatus.FORBIDDEN,
        );
      }
    });
    return true;
  }
}
