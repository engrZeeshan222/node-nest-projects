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
import { CarColorService } from './car-color.service';
import { CreateCarColorDto } from './dto/create-car-color.dto';
import { CarColor } from './entities/car-color.entity';

@ApiTags('car-color')
@Controller('car-color')
export class CarColorController {
  constructor(private readonly carColorService: CarColorService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCarColorDto: CreateCarColorDto,
  ): Promise<CarColor> {
    return await this.carColorService.create(createCarColorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req): Promise<CarColor[]> {
    return await this.carColorService.findAll(params, req.user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<CarColor> {
    return await this.carColorService.remove(+id);
  }
}
