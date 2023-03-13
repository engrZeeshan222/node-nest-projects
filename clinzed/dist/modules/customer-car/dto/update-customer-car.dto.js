"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerCarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_customer_car_dto_1 = require("./create-customer-car.dto");
class UpdateCustomerCarDto extends (0, swagger_1.PartialType)(create_customer_car_dto_1.CreateCustomerCarDto) {
}
exports.UpdateCustomerCarDto = UpdateCustomerCarDto;
//# sourceMappingURL=update-customer-car.dto.js.map