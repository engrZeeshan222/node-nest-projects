import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from 'express-serve-static-core';
import { COMMON_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from './entities/color.entity';
const relationsArray = ['carColors'];
@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}
  async create(createColorDto: CreateColorDto): Promise<Color> {
    try {
      let color = this.colorRepository.create(createColorDto);
      color = await this.colorRepository.save(createColorDto);
      return color;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<Color[]> {
    try {
      const apiData = new apiFeatures(this.colorRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      if (user.role != Role.ADMIN) {
        const data2 = {
          status: COMMON_STATUS.ACTIVE,
        };
        const where = [data2];
        apiData.where(where);
      }
      const chargerTypes = await apiData.query();
      return chargerTypes;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<Color> {
    try {
      const color = await this.colorRepository.findOne({
        where: { id: id },
        relations: relationsArray,
      });
      return color;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
