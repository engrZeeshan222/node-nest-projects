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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ChargerTypeService } from './charger-type.service';
import { CreateChargerTypeDto } from './dto/create-charger-type.dto';
import { UpdateChargerTypeDto } from './dto/update-charger-type.dto';
import { ChargerType } from './entities/charger-type.entity';

@ApiTags('charger-type')
@Controller('charger-type')
export class ChargerTypeController {
  constructor(private readonly chargerTypeService: ChargerTypeService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() createChargerTypeDto: CreateChargerTypeDto,
  ): Promise<ChargerType> {
    return await this.chargerTypeService.create(createChargerTypeDto);
  }
  //return type
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req): Promise<ChargerType[]> {
    return await this.chargerTypeService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ChargerType> {
    return await this.chargerTypeService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateChargerTypeDto: UpdateChargerTypeDto,
  ): Promise<ChargerType> {
    return await this.chargerTypeService.update(+id, updateChargerTypeDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string): Promise<ChargerType> {
    return await this.chargerTypeService.remove(+id);
  }
}
