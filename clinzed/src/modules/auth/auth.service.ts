import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UserStatus } from 'src/common/enum';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';
import { PayLoad } from './dto/payload.dto';
import { SignUpUserDto } from './dto/signup.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(identifier: string, pass: string) {
    try {
      // find if user exist with this email
      const user = await this.userService.findOneByEmail(identifier);
      if (!user) {
        throw new HttpException(
          'No user found with this email',
          HttpStatus.NOT_FOUND,
        );
      }
      if (user.status != UserStatus.APPROVED) {
        throw new HttpException(
          'Sorry your account is not Activated',
          HttpStatus.NOT_FOUND,
        );
      }

      // find if user password match
      const match = await this.userService.comparePassword(pass, user.password);
      if (!match) {
        throw new HttpException('InCorrect Password', HttpStatus.NOT_FOUND);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  public async login(user, loginBody?: PayLoad) {
    try {
      await this.userService.loginAs(loginBody?.isHost || false, user);
      const token = await this.generateToken(user, loginBody?.isHost || false);
      return { user, token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  public async generateToken(user: User, isHost?: boolean): Promise<string> {
    try {
      let payload: PayLoad = {
        id: user.id,
        email: user.email,
        role: user.role,
        isHost: isHost || false,
      };
      payload = JSON.parse(JSON.stringify(payload));
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWTKEY,
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async create(signUpUserDto: SignUpUserDto) {
    try {
      const userAlreadyExist = await this.userService.findOneByEmail(
        signUpUserDto.email,
      );
      if (userAlreadyExist) {
        throw new HttpException(
          'user with this email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const encryptPassword = await this.userService.hashPassword(
        signUpUserDto.password,
      );
      const match = await this.userService.comparePassword(
        signUpUserDto.confirmPassword,
        encryptPassword,
      );

      if (!match) {
        throw new HttpException(
          'passwords are not matched',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userService.create({
        ...signUpUserDto,
        password: encryptPassword,
      });
      const token = await this.generateToken(user);

      // confirmation email

      await this.mailService.sendUserConfirmation(user, token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return { user: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async facebook(access_token: any): Promise<any> {
    try {
      const { data } = await axios({
        url: 'https://graph.facebook.com/v2.9/me',
        method: 'get',
        params: {
          client_id: process.env.FACEBOOK_ACESS_TOKEN,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          fields: ['id', 'email', 'first_name', 'last_name'].join(','),
          access_token,
        },
      });
      const createUserInput: CreateUserDto = {
        email: data.email,
        firstName: data.first_name,
        facebookId: data.id,
        provider: 'facebook',
        status: UserStatus.APPROVED,
        lastName: data.last_name,
      };

      const user = await this.userService.socialLogin(createUserInput);
      return await this.login(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async google(access_token: string): Promise<any> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: access_token,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new NotFoundException('No user found with this email');
      }

      const createUserInput: CreateUserDto = {
        email: payload.email,
        firstName: payload.given_name,
        googleId: payload.sub,
        provider: 'google',
        lastName: payload.family_name,
      };
      const user = await this.userService.socialLogin(createUserInput);
      return await this.login(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async verifyAccount(params: any) {
    const decodeUser = await this.jwtService.decode(params.token);
    if (!decodeUser) {
      throw new HttpException('Invailid Token', HttpStatus.NOT_FOUND);
    }
    let user = await this.userService.findOneById(decodeUser['id']);
    user = await this.userService.activateAccount(user);
    const token = await this.generateToken(user);

    return { user, token };
  }
  public async forgotPassword(email: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (!user) {
        throw new HttpException(
          'No user found with this email',
          HttpStatus.NOT_FOUND,
        );
      }

      const token = await this.generateToken(user);
      // reset password mail
      await this.mailService.resetPassword(user, token);
      return { message: 'mail has been sent on given email' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    // tslint:disable-next-line: no-string-literal
  }
  public async resetPassword(token, body): Promise<any> {
    try {
      const decodedUser = await this.jwtService.decode(token);
      if (!decodedUser) {
        throw new HttpException('Invailid Token', HttpStatus.NOT_FOUND);
      }
      const encryptPassword = await this.userService.hashPassword(
        body.password,
      );
      const match = await this.userService.comparePassword(
        body.confirmPassword,
        encryptPassword,
      );

      if (!match) {
        throw new HttpException(
          'passwords are not matched',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userService.findOneByEmail(decodedUser['email']);

      if (!user) {
        throw new HttpException(
          'No user found with this email',
          HttpStatus.NOT_FOUND,
        );
      }
      user.password = encryptPassword;
      const updatedUser = await this.userService.updatePassword(user);

      return {
        message: 'your password has been updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
