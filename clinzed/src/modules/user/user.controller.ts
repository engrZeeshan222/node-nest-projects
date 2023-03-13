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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req, @Query('') params) {
    return await this.usersService.findAll(params, req.user);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.usersService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return await this.usersService.update(+id, updateUserDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    return await this.usersService.remove(+id, req.user);
  }
}
