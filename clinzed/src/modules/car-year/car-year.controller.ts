import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CarYearService } from './car-year.service';
import { CreateCarYearDto } from './dto/create-car-year.dto';
import { CarYear } from './entities/car-year.entity';

@ApiTags('car-year')
@Controller('car-year')
export class CarYearController {
  constructor(private readonly carYearService: CarYearService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCarYearDto: CreateCarYearDto): Promise<CarYear> {
    return await this.carYearService.create(createCarYearDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req): Promise<CarYear[]> {
    return await this.carYearService.findAll(params, req.user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<CarYear> {
    return await this.carYearService.remove(+id);
  }
}
