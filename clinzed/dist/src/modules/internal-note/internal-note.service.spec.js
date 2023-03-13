"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const internal_note_service_1 = require("./internal-note.service");
describe('InternalNoteService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [internal_note_service_1.InternalNoteService],
        }).compile();
        service = module.get(internal_note_service_1.InternalNoteService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=internal-note.service.spec.js.map