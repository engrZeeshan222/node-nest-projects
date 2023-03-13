"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const message_thread_controller_1 = require("./message-thread.controller");
const message_thread_service_1 = require("./message-thread.service");
describe('MessageThreadController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [message_thread_controller_1.MessageThreadController],
            providers: [message_thread_service_1.MessageThreadService],
        }).compile();
        controller = module.get(message_thread_controller_1.MessageThreadController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=message-thread.controller.spec.js.map