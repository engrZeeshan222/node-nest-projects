import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateYearChargerTypeDto } from './dto/create-year-charger-type.dto';
import { UpdateYearChargerTypeDto } from './dto/update-year-charger-type.dto';
import { YearChargerType } from './entities/year-charger-type.entity';

@Injectable()
export class YearChargerTypeService {
  constructor(
    @InjectRepository(YearChargerType)
    private readonly yearChargerTypeRepository: Repository<YearChargerType>,
  ) {}
  async create(createYearChargerTypeDto: CreateYearChargerTypeDto) {
    let yearChargerType = this.yearChargerTypeRepository.create(
      createYearChargerTypeDto,
    );
    yearChargerType = await this.yearChargerTypeRepository.save(
      yearChargerType,
    );
    return yearChargerType;
  }

  async findAll(): Promise<YearChargerType[]> {
    return await this.yearChargerTypeRepository.find();
  }
}
