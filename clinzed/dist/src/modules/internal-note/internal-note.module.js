"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalNoteModule = void 0;
const common_1 = require("@nestjs/common");
const internal_note_service_1 = require("./internal-note.service");
const internal_note_controller_1 = require("./internal-note.controller");
const typeorm_1 = require("@nestjs/typeorm");
const internal_note_entity_1 = require("./entities/internal-note.entity");
let InternalNoteModule = class InternalNoteModule {
};
InternalNoteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([internal_note_entity_1.InternalNote])],
        controllers: [internal_note_controller_1.InternalNoteController],
        providers: [internal_note_service_1.InternalNoteService],
        exports: [internal_note_service_1.InternalNoteService]
    })
], InternalNoteModule);
exports.InternalNoteModule = InternalNoteModule;
//# sourceMappingURL=internal-note.module.js.map