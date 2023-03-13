import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMON_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { CarModel } from './entities/car-model.entity';
const relationsArray = ['carMake', 'customerCars'];

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepository: Repository<CarModel>,
  ) {}
  async create(createCarModelDto: CreateCarModelDto): Promise<CarModel> {
    try {
      let carModel = this.carModelRepository.create(createCarModelDto);
      carModel = await this.carModelRepository.save(carModel);
      return carModel;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User): Promise<CarModel[]> {
    try {
      const apiData = new apiFeatures(this.carModelRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = COMMON_STATUS.ACTIVE;
      }

      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const carModels = await apiData.query();
      return carModels;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number): Promise<CarModel> {
    try {
      let carModel = await this.carModelRepository.findOne({ where: { id } });
      carModel.status = COMMON_STATUS.DELETED;
      carModel = await this.carModelRepository.save({
        ...carModel,
      });
      return carModel;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
