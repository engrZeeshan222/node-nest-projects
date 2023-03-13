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
import { CarMakeService } from './car-make.service';
import { CreateCarMakeDto } from './dto/create-car-make.dto';
import { CarMake } from './entities/car-make.entity';
@ApiTags('car-make')
@Controller('car-make')
export class CarMakeController {
  constructor(private readonly carMakeService: CarMakeService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createCarMakeDto: CreateCarMakeDto): Promise<CarMake> {
    return await this.carMakeService.create(createCarMakeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req): Promise<CarMake[]> {
    return await this.carMakeService.findAll(params, req.user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string): Promise<CarMake> {
    return await this.carMakeService.remove(+id);
  }
}
