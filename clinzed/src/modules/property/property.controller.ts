import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPropertyDto: CreatePropertyDto, @Request() req) {
    return await this.propertyService.create(createPropertyDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req) {
    return await this.propertyService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Get('avg-price/:zipCode')
  @UseGuards(JwtAuthGuard)
  async averageRate(@Param('zipCode') zipCode: string) {
    return this.propertyService.average(zipCode);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Request() req,
  ) {
    return await this.propertyService.update(+id, updatePropertyDto, req.user);
  }
  @Patch('pause/:id')
  @UseGuards(JwtAuthGuard)
  async pauseProperty(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Request() req,
  ) {
    return await this.propertyService.update(+id, updatePropertyDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    return await this.propertyService.remove(+id, req.user);
  }
}
