import { InternalNoteService } from './internal-note.service';
import { CreateInternalNoteDto } from './dto/create-internal-note.dto';
export declare class InternalNoteController {
    private readonly internalNoteService;
    constructor(internalNoteService: InternalNoteService);
    create(createInternalNoteDto: CreateInternalNoteDto): Promise<import("./entities/internal-note.entity").InternalNote>;
}
