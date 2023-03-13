"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreditCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_credit_card_dto_1 = require("./create-credit-card.dto");
class UpdateCreditCardDto extends (0, swagger_1.PartialType)(create_credit_card_dto_1.CreateCreditCardDto) {
}
exports.UpdateCreditCardDto = UpdateCreditCardDto;
//# sourceMappingURL=update-credit-card.dto.js.map