import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    return await this.messagesService.create(createMessageDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('') params, @Request() req) {
    return await this.messagesService.findAll(params, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.messagesService.findOne(+id);
  }

  @Get('read-all/:id')
  @UseGuards(JwtAuthGuard)
  async ReadAllMessages(@Param('id') id: string, @Request() req) {
    return await this.messagesService.readAll(+id, req.user);
  }
}
