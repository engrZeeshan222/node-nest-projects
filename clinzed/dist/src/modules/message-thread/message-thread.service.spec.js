"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const message_thread_service_1 = require("./message-thread.service");
describe('MessageThreadService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [message_thread_service_1.MessageThreadService],
        }).compile();
        service = module.get(message_thread_service_1.MessageThreadService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=message-thread.service.spec.js.map