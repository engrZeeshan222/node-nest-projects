import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { CreateInternalNoteDto } from '../internal-note/dto/create-internal-note.dto';
import { InternalNoteService } from '../internal-note/internal-note.service';
import { User } from '../user/entities/user.entity';
import apiFeatures from '../utils/apiFeatures';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

const relationsArray = ['property', 'internalNote'];
@Injectable()
export class AddressService {
  constructor(
    private readonly internalNoteService: InternalNoteService,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    try {
      let address = this.addressRepository.create(createAddressDto);

      const internalNoteDto:CreateInternalNoteDto={
        messageBody:createAddressDto.messageBody
      }
      if(internalNoteDto.messageBody){
        address.internalNote=await this.internalNoteService.create(internalNoteDto)
      }
      address = await this.addressRepository.save(address);
      return address;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(queryParams: Query, user: User) {
    try {
      const apiData = new apiFeatures(this.addressRepository, queryParams);
      apiData.paginate().includeFields(relationsArray);
      const filterData = apiData.filters(queryParams);

      if (Object.keys(filterData).length > 0) {
        const where = [filterData];

        apiData.where(where);
      }
      const address = await apiData.query();
      return address;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const address = await this.addressRepository.findOne({
        where: { id: id },
        relations: relationsArray,
      });
      return address;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      let address = await this.findOne(id);

      address = await this.addressRepository.save({
        ...address,
        ...updateAddressDto,
      });
      return address;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
