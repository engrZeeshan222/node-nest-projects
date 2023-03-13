import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { CreateUserSettingDto } from './dto/create-user-setting.dto';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum';

@ApiTags('user-settings')
@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    return this.userSettingsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserSettingDto: UpdateUserSettingDto,
    @Request() req,
  ) {
    return this.userSettingsService.update(+id, updateUserSettingDto, req.user);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.userSettingsService.remove(+id);
  // }
}
