import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMON_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateChargerTypeDto } from './dto/create-charger-type.dto';
import { UpdateChargerTypeDto } from './dto/update-charger-type.dto';
import { ChargerType } from './entities/charger-type.entity';
const relationsArray = ['caryears'];

@Injectable()
export class ChargerTypeService {
  constructor(
    @InjectRepository(ChargerType)
    private readonly chargerTypeRepository: Repository<ChargerType>,
  ) {}
  async create(
    createChargerTypeDto: CreateChargerTypeDto,
  ): Promise<ChargerType> {
    try {
      let chargerType = this.chargerTypeRepository.create(createChargerTypeDto);
      chargerType = await this.chargerTypeRepository.save(chargerType);
      return chargerType;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<ChargerType[]> {
    try {
      const apiData = new apiFeatures(this.chargerTypeRepository, queryParams);
      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = COMMON_STATUS.ACTIVE;
      }
      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const chargerTypes = await apiData.query();
      return chargerTypes;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<ChargerType> {
    try {
      const chargerType = await this.chargerTypeRepository.findOne({
        where: { id: id },
        relations: relationsArray,
      });
      return chargerType;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    updateChargerTypeDto: UpdateChargerTypeDto,
  ): Promise<ChargerType> {
    try {
      let chargerType = await this.chargerTypeRepository.findOne({
        where: {
          id,
        },
      });
      chargerType = await this.chargerTypeRepository.save({
        ...chargerType,
        ...updateChargerTypeDto,
      });
      return chargerType;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number): Promise<ChargerType> {
    try {
      let chargerType = await this.chargerTypeRepository.findOne({
        where: {
          id,
        },
      });
      chargerType.status = COMMON_STATUS.DELETED;
      chargerType = await this.chargerTypeRepository.save({
        ...chargerType,
      });
      return chargerType;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
