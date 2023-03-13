"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const credit_card_controller_1 = require("./credit-card.controller");
const credit_card_service_1 = require("./credit-card.service");
describe('CreditCardController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [credit_card_controller_1.CreditCardController],
            providers: [credit_card_service_1.CreditCardService],
        }).compile();
        controller = module.get(credit_card_controller_1.CreditCardController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=credit-card.controller.spec.js.map