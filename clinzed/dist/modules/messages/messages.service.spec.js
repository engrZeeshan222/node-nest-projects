"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const messages_service_1 = require("./messages.service");
describe('MessagesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [messages_service_1.MessagesService],
        }).compile();
        service = module.get(messages_service_1.MessagesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=messages.service.spec.js.map