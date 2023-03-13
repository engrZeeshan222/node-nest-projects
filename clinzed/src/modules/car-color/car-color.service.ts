import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMON_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateCarColorDto } from './dto/create-car-color.dto';
import { CarColor } from './entities/car-color.entity';
const relationsArray = ['carModel', 'customerCars'];

@Injectable()
export class CarColorService {
  constructor(
    @InjectRepository(CarColor)
    private readonly carColorRepository: Repository<CarColor>,
  ) {}
  async create(createCarColorDto: CreateCarColorDto): Promise<CarColor> {
    try {
      let carColor = this.carColorRepository.create(createCarColorDto);
      carColor = await this.carColorRepository.save(carColor);
      return carColor;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<CarColor[]> {
    try {
      const apiData = new apiFeatures(this.carColorRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = COMMON_STATUS.ACTIVE;
      }
      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }

      const carColors = await apiData.query();
      return carColors;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number): Promise<CarColor> {
    try {
      let carColor = await this.carColorRepository.findOne({ where: { id } });
      carColor.status = COMMON_STATUS.DELETED;
      carColor = await this.carColorRepository.save({
        ...carColor,
      });
      return carColor;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
