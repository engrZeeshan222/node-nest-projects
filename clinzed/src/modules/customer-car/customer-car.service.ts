import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CUSTOMER_CAR_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { PayLoad } from '../auth/dto/payload.dto';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';
import apiFeatures from '../utils/apiFeatures';
import { CreateCustomerCarDto } from './dto/create-customer-car.dto';
import { UpdateCustomerCarDto } from './dto/update-customer-car.dto';
import { CustomerCar } from './entities/customer-car.entity';
const relationsArray = ['user', 'carYear', 'carColor', 'carModel'];
@Injectable()
export class CustomerCarService {
  constructor(
    @InjectRepository(CustomerCar)
    private readonly customerCarRepository: Repository<CustomerCar>,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createCustomerCarDto: CreateCustomerCarDto,
    loginUser: PayLoad,
  ): Promise<CustomerCar> {
    try {
      const user = await this.usersService.findOne(loginUser.id, loginUser);
      let car = this.customerCarRepository.create(createCustomerCarDto);
      car.user = user;
      car = await this.customerCarRepository.save(car);

      return car;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: PayLoad): Promise<CustomerCar[]> {
    try {
      const apiData = new apiFeatures(this.customerCarRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (user.role != Role.ADMIN) {
        filterData['status'] = CUSTOMER_CAR_STATUS.ACTIVE;
        filterData['user'] = user.id;
      }
      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const cars = await apiData.query();
      return cars;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<CustomerCar> {
    try {
      const car = await this.customerCarRepository.findOne({
        where: { id: id },
        relations: relationsArray,
      });
      return car;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    updateCustomerCarDto: UpdateCustomerCarDto,
    loginUser: PayLoad,
  ): Promise<CustomerCar> {
    try {
      let car = await this.findOne(id);
      if (loginUser.role == Role.ADMIN || car.user.id == loginUser.id) {
        car = await this.customerCarRepository.save({
          ...car,
          ...updateCustomerCarDto,
        });
        return car;
      } else {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number, loginUser: PayLoad): Promise<CustomerCar> {
    try {
      let car = await this.findOne(id);

      if (loginUser.role == Role.ADMIN || car.user.id == loginUser.id) {
        car = await this.findOne(id);
        car.status = CUSTOMER_CAR_STATUS.DELETED;
        car = await this.customerCarRepository.save({ ...car });
        return car;
      } else {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
