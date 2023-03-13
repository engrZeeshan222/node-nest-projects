import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InternalNoteService } from './internal-note.service';
import { CreateInternalNoteDto } from './dto/create-internal-note.dto';
import { UpdateInternalNoteDto } from './dto/update-internal-note.dto';

@Controller('internal-note')
export class InternalNoteController {
  constructor(private readonly internalNoteService: InternalNoteService) {}

  @Post()
  async create(@Body() createInternalNoteDto: CreateInternalNoteDto) {
    return await this.internalNoteService.create(createInternalNoteDto);
  }

 
}
