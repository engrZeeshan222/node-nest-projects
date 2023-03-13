import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { PropertyService } from '../property/property.service';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateChargerPropertyDto } from './dto/create-charger-property.dto';
import { UpdateChargerPropertyDto } from './dto/update-charger-property.dto';
import { ChargerProperty } from './entities/charger-property.entity';
const relationsArray = ['chargerType', 'property'];
@Injectable()
export class ChargerPropertyService {
  constructor(
    @InjectRepository(ChargerProperty)
    private readonly ChargerPropertyRepository: Repository<ChargerProperty>,
    @Inject(forwardRef(() => PropertyService))
    private readonly propertyService: PropertyService,  ) {}
  async create(createChargerPropertyDto: CreateChargerPropertyDto, user: User) {
    try {
      const property = await this.propertyService.findOne(
        Number(createChargerPropertyDto.property),
      );

      if (property && property.host?.id == user.id) {
        let chargerProperty = this.ChargerPropertyRepository.create(
          createChargerPropertyDto,
        );
        chargerProperty = await this.ChargerPropertyRepository.save(
          chargerProperty,
        );
        return chargerProperty;
      } else {
        throw new HttpException(
          'FORBIDDEN! Only host can enter these details',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async createMany(arrayOfChargers) {
    const propertyChargers =
      await this.ChargerPropertyRepository.createQueryBuilder()
        .insert()
        .values(arrayOfChargers)
        .execute();
    return propertyChargers;
  }
  async findAll(queryParams: Query, user: User) {
    try {
      const apiData = new apiFeatures(
        this.ChargerPropertyRepository,
        queryParams,
      );
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const chargerProperty = await apiData.query();
      return chargerProperty;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const carYear = await this.ChargerPropertyRepository.findOne({
        where: {
          id,
        },
      });

      return carYear;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async update(
    id: number,
    updateChargerPropertyDto: UpdateChargerPropertyDto,
    user: User,
  ) {
    try {
      let chargerProperty = await this.ChargerPropertyRepository.findOne({
        where: {
          id,
        },
        relations: relationsArray,
      });

      if (
        chargerProperty.property &&
        chargerProperty.property.host?.id == user.id
      ) {
        if (chargerProperty) {
          chargerProperty = await this.ChargerPropertyRepository.save({
            ...chargerProperty,
          });
        }

        return chargerProperty;
      } else {
        throw new HttpException(
          'FORBIDDEN! Only host can enter these details',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async remove(id: number, user: User) {
    try {
      const chargerProperty = await this.ChargerPropertyRepository.findOne({
        where: {
          id,
        },
        relations: relationsArray,
      });

      if (
        chargerProperty.property &&
        chargerProperty.property.host?.id == user.id
      ) {
        if (chargerProperty) {
          await this.ChargerPropertyRepository.remove(chargerProperty);
        }

        return chargerProperty;
      } else {
        throw new HttpException(
          'FORBIDDEN! Only host can enter these details',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
