"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const credit_card_service_1 = require("./credit-card.service");
describe('CreditCardService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [credit_card_service_1.CreditCardService],
        }).compile();
        service = module.get(credit_card_service_1.CreditCardService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=credit-card.service.spec.js.map