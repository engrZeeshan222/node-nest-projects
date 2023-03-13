import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Role, UserStatus } from 'src/common/enum';
import apiFeatures from '../utils/apiFeatures';
import { Query } from 'typeorm/driver/Query';
import { CreateUserSettingDto } from '../user-settings/dto/create-user-setting.dto';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { PayLoad } from '../auth/dto/payload.dto';
const relationsArray = ['userSetting'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userSettingsService: UserSettingsService,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let user = await this.findOneByEmail(createUserDto.email);
      if (user) {
        throw new HttpException(
          'user with this email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      user = await this.usersRepository.create(createUserDto);
      if (user.status === UserStatus.APPROVED) {
        const stripeAccount = await this.stripeClient.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        });
        ({ stripeAccount });
        user.stripeAccountId = stripeAccount.id;
      }
      user = await this.usersRepository.save(user);

      if (user) {
        const userSettingDto: CreateUserSettingDto = {
          isHostView: false,
          user: user,
        };
        await this.userSettingsService.create(userSettingDto);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, 10);

      return hash;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async updatePassword(user: User): Promise<User> {
    try {
      const updatedUser = await this.usersRepository.save({ ...user });
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email: email,
        },
        select: [
          'password',
          'email',
          'firstName',
          'lastName',
          'phone',
          'role',
          'status',
          'createdAt',
          'updatedAt',
          'id',
        ],
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async loginAs(inhostVeiw: boolean, loginuser: User) {
    let user = await this.usersRepository.findOne({
      where: {
        id: loginuser.id,
      },
    });
    if (inhostVeiw) {
      user.lastHostLogin = new Date();
    } else {
      user.lastCustomerLogin = new Date();
    }
    user = await this.usersRepository.save({ ...user });
  }
  async findOneFacebookId(facebookId: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          facebookId: facebookId,
        },
        select: [
          'email',
          'firstName',
          'lastName',
          'phone',
          'role',
          'status',
          'createdAt',
          'updatedAt',
          'id',
        ],
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async comparePassword(enteredPassword, dbPassword) {
    try {
      const match = await bcrypt.compare(enteredPassword, dbPassword);

      return match;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async findOneById(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async findAll(queryParams: Query, user: PayLoad) {
    try {
      const apiData = new apiFeatures(this.usersRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      let data2;
      if (user.role != Role.ADMIN) {
        data2 = {
          status: UserStatus.APPROVED,
          id: Not(user.id),
        };
      } else {
        data2 = {
          id: Not(user.id),
        };
      }
      const where = [data2];

      apiData.where(where);
      const users = await apiData.query();

      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async activateAccount(user: User) {
    user.status = UserStatus.APPROVED;
    if (user.status === UserStatus.APPROVED) {
      const stripeAccount = await this.stripeClient.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
      user.stripeAccountId = stripeAccount.id;
    }
    user = await this.usersRepository.save({ ...user });
    return user;
  }
  async findOne(id: number, loginUser: PayLoad) {
    try {
      if (loginUser.role == Role.ADMIN || id == loginUser.id) {
        const user = await this.usersRepository.findOne({
          where: {
            id: id,
          },
          relations: relationsArray,
        });
        if (!user) {
          throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
        return user;
      } else {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, loginUser: PayLoad) {
    try {
      let user = await this.findOne(id, loginUser);
      user = await this.usersRepository.save({ ...user, ...updateUserDto });
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number, loginUser: PayLoad) {
    try {
      let user = await this.findOne(id, loginUser);

      user.status = UserStatus.DELETED;
      user = await this.usersRepository.save({ ...user });
      if (user.stripeAccountId) {
        const deleted = await this.stripeClient.customers.del(
          user.stripeAccountId,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async socialLogin(createUserInput: CreateUserDto): Promise<User> {
    try {
      let user;
      if (createUserInput.email) {
        user = await this.findOneByEmail(createUserInput.email);
      } else if (createUserInput.provider == 'facebook') {
        user = await this.findOneFacebookId(createUserInput.facebookId);
        if (!user) {
          createUserInput.email = createUserInput.facebookId;
        }
      }
      if (user) {
        return user;
      }
      user = await this.usersRepository.create(createUserInput);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
