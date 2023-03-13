import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request): Promise<any> {
    const reqBody = req.body;
    const user = await this.authService.validateUser(
      reqBody.email,
      reqBody.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }
}
