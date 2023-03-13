import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@ApiTags('credit-card')
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCreditCardDto: CreateCreditCardDto,
    @Request() req,
  ) {
    return await this.creditCardService.create(createCreditCardDto, req.user);
  }
  //user specific
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() params, @Request() req) {
    return await this.creditCardService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.creditCardService.findOne(+id);
  }

  @Patch('default_card/:id')
  @UseGuards(JwtAuthGuard)
  async defaultCard(@Param('id') id: string, @Request() req) {
    return await this.creditCardService.defaultCard(+id, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return await this.creditCardService.remove(+id, req.user);
  }
}
