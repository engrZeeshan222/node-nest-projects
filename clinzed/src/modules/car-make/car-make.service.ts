import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMON_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateCarMakeDto } from './dto/create-car-make.dto';
import { CarMake } from './entities/car-make.entity';

const relationsArray = ['carModels'];

@Injectable()
export class CarMakeService {
  constructor(
    @InjectRepository(CarMake)
    private readonly carMakeRepository: Repository<CarMake>,
  ) {}
  async create(createCarMakeDto: CreateCarMakeDto): Promise<CarMake> {
    try {
      let carMake = this.carMakeRepository.create(createCarMakeDto);
      carMake = await this.carMakeRepository.save(carMake);
      return carMake;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<CarMake[]> {
    try {
      const apiData = new apiFeatures(this.carMakeRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);

      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = COMMON_STATUS.ACTIVE;
      }
      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const carMakes = await apiData.query();
      return carMakes;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number): Promise<CarMake> {
    try {
      let carMake = await this.carMakeRepository.findOne({ where: { id } });
      carMake.status = COMMON_STATUS.DELETED;
      carMake = await this.carMakeRepository.save({
        ...carMake,
      });
      return carMake;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
