"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalNoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const internal_note_entity_1 = require("./entities/internal-note.entity");
let InternalNoteService = class InternalNoteService {
    constructor(internalNoteRepository) {
        this.internalNoteRepository = internalNoteRepository;
    }
    async create(createInternalNoteDto) {
        let internalNote = await this.internalNoteRepository.create(createInternalNoteDto);
        internalNote = await this.internalNoteRepository.save(internalNote);
        return internalNote;
    }
    async findAll() {
        return `This action returns all internalNote`;
    }
    async findOne(id) {
        return `This action returns a #${id} internalNote`;
    }
    async update(id, updateInternalNoteDto) {
        return `This action updates a #${id} internalNote`;
    }
    async remove(id) {
        return `This action removes a #${id} internalNote`;
    }
};
InternalNoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_note_entity_1.InternalNote)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InternalNoteService);
exports.InternalNoteService = InternalNoteService;
//# sourceMappingURL=internal-note.service.js.map