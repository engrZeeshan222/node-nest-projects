"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardModule = void 0;
const common_1 = require("@nestjs/common");
const credit_card_service_1 = require("./credit-card.service");
const credit_card_controller_1 = require("./credit-card.controller");
const typeorm_1 = require("@nestjs/typeorm");
const credit_card_entity_1 = require("./entities/credit-card.entity");
let CreditCardModule = class CreditCardModule {
};
CreditCardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([credit_card_entity_1.CreditCard])],
        controllers: [credit_card_controller_1.CreditCardController],
        providers: [credit_card_service_1.CreditCardService],
    })
], CreditCardModule);
exports.CreditCardModule = CreditCardModule;
//# sourceMappingURL=credit-card.module.js.map