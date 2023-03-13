import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMON_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateCarYearDto } from './dto/create-car-year.dto';
import { CarYear } from './entities/car-year.entity';
const relationsArray = ['carModel', 'customerCars'];

@Injectable()
export class CarYearService {
  constructor(
    @InjectRepository(CarYear)
    private readonly carYearRepository: Repository<CarYear>,
  ) {}
  async create(createCarYearDto: CreateCarYearDto) {
    try {
      let carYear = this.carYearRepository.create(createCarYearDto);
      carYear = await this.carYearRepository.save(carYear);
      return carYear;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<CarYear[]> {
    try {
      const apiData = new apiFeatures(this.carYearRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = COMMON_STATUS.ACTIVE;
      }
      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const carYears = await apiData.query();
      return carYears;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number): Promise<CarYear> {
    try {
      let carYear = await this.carYearRepository.findOne({
        where: {
          id,
        },
      });
      carYear.status = COMMON_STATUS.DELETED;
      carYear = await this.carYearRepository.save({
        ...carYear,
      });
      return carYear;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
