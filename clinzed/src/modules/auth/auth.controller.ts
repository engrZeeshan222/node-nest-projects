import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
  Get,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Fields } from 'src/common/decorators/fields.decorator';
import { FieldGuard } from 'src/common/guards/fields.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req): Promise<{ user: any; token: string }> {
    return await this.authService.login(req.user, req.body);
  }
  @Post('signup')
  // @Fields('role', 'status')
  @ApiBody({ type: SignUpUserDto })
  async signUp(@Body() signUpUser: SignUpUserDto) {
    return await this.authService.create(signUpUser);
  }
  @Post('google')
  async googleLogin(@Body('access_token') access_token: string) {
    return await this.authService.google(access_token);
  }
  @Post('facebook')
  async faceBookLogin(@Body('access_token') access_token: string) {
    return await this.authService.facebook(access_token);
  }
  @Get('verify')
  async verifyAccount(@Query('') params) {
    return await this.authService.verifyAccount(params);
  }
  @Post('forgot-password')
  async forgotPassword(@Body('email') email) {
    return await this.authService.forgotPassword(email);
  }
  @Patch('reset-password/:token')
  async resetPassword(@Param('token') token, @Body() body): Promise<any> {
    try {
      return await this.authService.resetPassword(token, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
