import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CustomerCarService } from './customer-car.service';
import { CreateCustomerCarDto } from './dto/create-customer-car.dto';
import { UpdateCustomerCarDto } from './dto/update-customer-car.dto';
@ApiTags('customer-car')
@Controller('customer-car')
export class CustomerCarController {
  constructor(private readonly customerCarService: CustomerCarService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCustomerCarDto: CreateCustomerCarDto,
    @Request() req,
  ) {
    return await this.customerCarService.create(createCustomerCarDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req) {
    return await this.customerCarService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.customerCarService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCustomerCarDto: UpdateCustomerCarDto,
    @Request() req,
  ) {
    return await this.customerCarService.update(
      +id,
      updateCustomerCarDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    return await this.customerCarService.remove(+id, req.user);
  }
}
