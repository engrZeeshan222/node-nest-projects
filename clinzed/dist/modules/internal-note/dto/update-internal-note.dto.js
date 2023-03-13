"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInternalNoteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_internal_note_dto_1 = require("./create-internal-note.dto");
class UpdateInternalNoteDto extends (0, swagger_1.PartialType)(create_internal_note_dto_1.CreateInternalNoteDto) {
}
exports.UpdateInternalNoteDto = UpdateInternalNoteDto;
//# sourceMappingURL=update-internal-note.dto.js.map