import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ChargerPropertyService } from './charger-property.service';
import { CreateChargerPropertyDto } from './dto/create-charger-property.dto';
import { UpdateChargerPropertyDto } from './dto/update-charger-property.dto';

@Controller('charger-property')
export class ChargerPropertyController {
  constructor(
    private readonly chargerPropertyService: ChargerPropertyService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createChargerPropertyDto: CreateChargerPropertyDto,
    @Request() req,
  ) {
    return this.chargerPropertyService.create(
      createChargerPropertyDto,
      req.user,
    );
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChargerPropertyDto: UpdateChargerPropertyDto,
    @Request() req,
  ) {
    return this.chargerPropertyService.update(
      +id,
      updateChargerPropertyDto,
      req.user,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('') params, @Request() req) {
    return this.chargerPropertyService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.chargerPropertyService.findOne(+id);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.chargerPropertyService.remove(+id, req.user);
  }
}
