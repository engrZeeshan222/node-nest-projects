"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const internal_note_controller_1 = require("./internal-note.controller");
const internal_note_service_1 = require("./internal-note.service");
describe('InternalNoteController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [internal_note_controller_1.InternalNoteController],
            providers: [internal_note_service_1.InternalNoteService],
        }).compile();
        controller = module.get(internal_note_controller_1.InternalNoteController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=internal-note.controller.spec.js.map