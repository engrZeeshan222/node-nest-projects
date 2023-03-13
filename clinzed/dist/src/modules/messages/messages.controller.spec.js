"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const messages_controller_1 = require("./messages.controller");
const messages_service_1 = require("./messages.service");
describe('MessagesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [messages_controller_1.MessagesController],
            providers: [messages_service_1.MessagesService],
        }).compile();
        controller = module.get(messages_controller_1.MessagesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=messages.controller.spec.js.map