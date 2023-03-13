import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';

import { Color } from './entities/color.entity';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return await this.colorService.create(createColorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req): Promise<Color[]> {
    return await this.colorService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Color> {
    return await this.colorService.findOne(+id);
  }
}
