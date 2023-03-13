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
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { CarModel } from './entities/car-model.entity';

@ApiTags('car-model')
@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCarModelDto: CreateCarModelDto,
  ): Promise<CarModel> {
    return await this.carModelService.create(createCarModelDto);
  }

  //filtration
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req): Promise<CarModel[]> {
    return await this.carModelService.findAll(params, req.user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<CarModel> {
    return await this.carModelService.remove(+id);
  }
}
