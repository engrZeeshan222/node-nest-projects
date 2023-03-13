import {
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  
  
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PROPERTY_STATUS, Role } from 'src/common/enum';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { AddressService } from '../address/address.service';
import { ChargerPropertyService } from '../charger-property/charger-property.service';
import { CreateInternalNoteDto } from '../internal-note/dto/create-internal-note.dto';
import { InternalNoteService } from '../internal-note/internal-note.service';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

const relationsArray = ['address', 'internalNote', 'host'];
@Injectable()
export class PropertyService {
  constructor(
    private readonly addressService: AddressService,
    private readonly internalNoteService: InternalNoteService,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @Inject(forwardRef(() => ChargerPropertyService))
    private readonly chargerPropertyService: ChargerPropertyService,
  ) {}
  async create(createPropertyDto: CreatePropertyDto, loginUser: User) {
    try {
      if (Object.keys(createPropertyDto.address).length == 0) {
        throw new HttpException(
          'Please provide address',
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const address = await this.addressService.create(
        createPropertyDto.address,
      );
      
      
      if (address) {
        createPropertyDto.address = address;
        let internalNoteDto:CreateInternalNoteDto={
          messageBody:createPropertyDto.messageBody
        };

        
        let property = await this.propertyRepository.create(createPropertyDto);
        property.host = loginUser;
        if(internalNoteDto.messageBody ){
          property.internalNote=await this.internalNoteService.create(internalNoteDto);
          }
        property = await this.propertyRepository.save(property);
        if (property && createPropertyDto.chargers) {
          createPropertyDto.chargers?.forEach((ele) => {
            ele.property = property;
          });
          
          this.chargerPropertyService.createMany(createPropertyDto.chargers);
        }
        return property;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(queryParams: Query, user: User) {
    try {
      const apiData = new apiFeatures(this.propertyRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      if (user.role != Role.ADMIN) {
        const data2 = {
          status: PROPERTY_STATUS.LISTED,
        };
        const where = [data2];
        apiData.where(where);
      }
      const property = await apiData.query();
      return property;
      
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const property = await this.propertyRepository.findOne({
        where: { id: id },
        relations: relationsArray,
      });
      return property;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
    loginUser: User,
  ) {
    try {
      let property = await this.findOne(id);
      property.host;
      if (loginUser.role == Role.ADMIN || property.host?.id == loginUser?.id) {
        property = await this.propertyRepository.save({
          ...property,
          ...updatePropertyDto,
        });
      }
      return property;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async pauseProperty(id: number, loginUser: User) {
    try {
      let property = await this.findOne(id);

      if (loginUser.role == Role.ADMIN || property.host.id == loginUser.id) {
        property.status = PROPERTY_STATUS.PAUSED;
        property = await this.propertyRepository.save({
          ...property,
        });
      }
      return property;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async remove(id: number, loginUser: User) {
    try {
      let property = await this.findOne(id);

      if (loginUser.role == Role.ADMIN || property.host.id == loginUser.id) {
        property.status = PROPERTY_STATUS.DELETED;
        property = await this.propertyRepository.save({
          ...property,
        });
      }
      return property;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async average(zipCode: string) {
    try {
      const properties = await this.propertyRepository.find({
        where: {
          address: {
            zip: zipCode,
          },
        },
      });
      let avg = 0;

      properties.forEach((ele) => {
        avg = avg + ele.costPerMinute;
      });
      return avg / properties.length;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
