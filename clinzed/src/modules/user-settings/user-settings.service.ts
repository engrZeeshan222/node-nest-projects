import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enum';
import { Not, Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateUserSettingDto } from './dto/create-user-setting.dto';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { UserSetting } from './entities/user-setting.entity';

const relationsArray = ['user'];
@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>,
  ) {}
  async create(createUserSettingDto: CreateUserSettingDto) {
    try {
      let user_setting = await this.userSettingRepository.create(
        createUserSettingDto,
      );
      user_setting = await this.userSettingRepository.save(user_setting);
      return user_setting;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User) {
    try {
      const apiData = new apiFeatures(this.userSettingRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);

      const data2 = {
        id: Not(user.id),
      };
      const where = [data2];

      apiData.where(where);
      const users = await apiData.query();

      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number, loginUser: User) {
    try {
      const userSetting = await this.userSettingRepository.findOne({
        where: {
          id: id,
        },
        relations: relationsArray,
      });
      if (loginUser.role == Role.ADMIN || userSetting.user.id == loginUser.id) {
        if (!userSetting) {
          throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
        return userSetting;
      } else {
        throw new HttpException('Forrbidden', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    updateUserSettingDto: UpdateUserSettingDto,
    loginUser: User,
  ) {
    try {
      let userSetting = await this.findOne(id, loginUser);

      userSetting = await this.userSettingRepository.save({
        ...userSetting,
        ...updateUserSettingDto,
      });
      return userSetting;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // async remove(id: number) {
  //   return `This action removes a #${id} userSetting`;
  // }
}
