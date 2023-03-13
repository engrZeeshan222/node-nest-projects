import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { YearChargerTypeService } from './year-charger-type.service';
import { CreateYearChargerTypeDto } from './dto/create-year-charger-type.dto';
import { UpdateYearChargerTypeDto } from './dto/update-year-charger-type.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('year-charger-type')
export class YearChargerTypeController {
  constructor(
    private readonly yearChargerTypeService: YearChargerTypeService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createYearChargerTypeDto: CreateYearChargerTypeDto) {
    return this.yearChargerTypeService.create(createYearChargerTypeDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.yearChargerTypeService.findAll();
  }
}
