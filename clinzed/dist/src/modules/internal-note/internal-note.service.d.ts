import { Repository } from 'typeorm';
import { CreateInternalNoteDto } from './dto/create-internal-note.dto';
import { UpdateInternalNoteDto } from './dto/update-internal-note.dto';
import { InternalNote } from './entities/internal-note.entity';
export declare class InternalNoteService {
    private readonly internalNoteRepository;
    constructor(internalNoteRepository: Repository<InternalNote>);
    create(createInternalNoteDto: CreateInternalNoteDto): Promise<InternalNote>;
    findAll(): Promise<string>;
    findOne(id: number): Promise<string>;
    update(id: number, updateInternalNoteDto: UpdateInternalNoteDto): Promise<string>;
    remove(id: number): Promise<string>;
}
