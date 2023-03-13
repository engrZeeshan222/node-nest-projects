"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_stripe_1 = require("nestjs-stripe");
const enum_1 = require("src/common/enum");
const stripe_1 = require("stripe");
const typeorm_2 = require("typeorm");
const apiFeatures_1 = require("../utils/apiFeatures");
const credit_card_entity_1 = require("./entities/credit-card.entity");
const relationsArray = ['user'];
let CreditCardService = class CreditCardService {
    constructor(creditCardRepository, stripeClient) {
        this.creditCardRepository = creditCardRepository;
        this.stripeClient = stripeClient;
    }
    async create(createCreditCardDto, loginUser) {
        try {
            const allCreditCardOfUser = await this.creditCardRepository.find({
                where: { user: loginUser },
            });
            if (allCreditCardOfUser.length == 0) {
                createCreditCardDto.isDefault = true;
            }
            let creditCard = this.creditCardRepository.create(createCreditCardDto);
            creditCard.user = loginUser;
            const card = await this.stripeClient.customers.createSource(loginUser.stripeAccountId, { source: createCreditCardDto.token });
            creditCard.stripeCardId = card.id;
            creditCard = await this.creditCardRepository.save(creditCard);
            return creditCard;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.creditCardRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const filterData = apiData.filters(queryParams);
            if (user.role != enum_1.Role.ADMIN) {
                filterData['status'] = enum_1.CARD_STATUS.ACTIVE;
            }
            if (Object.keys(filterData).length > 0) {
                const where = [filterData];
                apiData.where(where);
            }
            const cars = await apiData.query();
            return cars;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const creditCard = await this.creditCardRepository.findOne({
                where: { id: id },
                relations: relationsArray,
            });
            if (creditCard.status === enum_1.CARD_STATUS.DELETED) {
                throw new common_1.HttpException('CARD IS DELETED', common_1.HttpStatus.FORBIDDEN);
            }
            return creditCard;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async defaultCard(id, loginUser) {
        try {
            let creditCard = await this.findOne(id);
            if (creditCard.status === enum_1.CARD_STATUS.DELETED) {
                throw new common_1.HttpException('CARD IS DELETED', common_1.HttpStatus.FORBIDDEN);
            }
            if (creditCard.user.id == loginUser.id) {
                let alreadyDefaultCreditCard = await this.creditCardRepository.findOne({
                    where: {
                        user: loginUser,
                        isDefault: true,
                    },
                });
                if (alreadyDefaultCreditCard) {
                    alreadyDefaultCreditCard.isDefault = false;
                    alreadyDefaultCreditCard = await this.creditCardRepository.save(Object.assign({}, alreadyDefaultCreditCard));
                }
                creditCard.isDefault = true;
                creditCard = await this.creditCardRepository.save(Object.assign({}, creditCard));
                return creditCard;
            }
            else {
                throw new common_1.HttpException('FORBIDDEN', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id, loginUser) {
        try {
            let creditCard = await this.findOne(id);
            if (creditCard.user.id == loginUser.id) {
                creditCard.status = enum_1.CARD_STATUS.DELETED;
                creditCard = await this.creditCardRepository.save(Object.assign({}, creditCard));
                await this.stripeClient.customers.deleteSource(loginUser.stripeAccountId, creditCard.stripeCardId);
                return creditCard;
            }
            else {
                throw new common_1.HttpException('FORBIDDEN', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
CreditCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(credit_card_entity_1.CreditCard)),
    __param(1, (0, nestjs_stripe_1.InjectStripe)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        stripe_1.default])
], CreditCardService);
exports.CreditCardService = CreditCardService;
//# sourceMappingURL=credit-card.service.js.map