import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInternalNoteDto } from './dto/create-internal-note.dto';
import { UpdateInternalNoteDto } from './dto/update-internal-note.dto';
import { InternalNote } from './entities/internal-note.entity';

@Injectable()
export class InternalNoteService {
  constructor(
    @InjectRepository(InternalNote)
    private readonly internalNoteRepository: Repository<InternalNote>,
  ) {}
  async create(createInternalNoteDto: CreateInternalNoteDto) {
    let internalNote = await this.internalNoteRepository.create(
      createInternalNoteDto,
    );
    internalNote = await this.internalNoteRepository.save(internalNote);
    return internalNote;
  }

  async findAll() {
    return `This action returns all internalNote`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} internalNote`;
  }

  async update(id: number, updateInternalNoteDto: UpdateInternalNoteDto) {
    return `This action updates a #${id} internalNote`;
  }

  async remove(id: number) {
    return `This action removes a #${id} internalNote`;
  }
}