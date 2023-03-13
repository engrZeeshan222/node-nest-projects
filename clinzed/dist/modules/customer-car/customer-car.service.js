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
exports.CustomerCarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const apiFeatures_1 = require("../utils/apiFeatures");
const customer_car_entity_1 = require("./entities/customer-car.entity");
const relationsArray = ['user', 'carYear', 'carColor', 'carModel'];
let CustomerCarService = class CustomerCarService {
    constructor(customerCarRepository, usersService) {
        this.customerCarRepository = customerCarRepository;
        this.usersService = usersService;
    }
    async create(createCustomerCarDto, loginUser) {
        try {
            const user = await this.usersService.findOne(loginUser.id, loginUser);
            let car = this.customerCarRepository.create(createCustomerCarDto);
            car.user = user;
            car = await this.customerCarRepository.save(car);
            return car;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.customerCarRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const filterData = apiData.filters(queryParams);
            if (user.role != enum_1.Role.ADMIN) {
                filterData['status'] = enum_1.CUSTOMER_CAR_STATUS.ACTIVE;
                filterData['user'] = user.id;
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
            const car = await this.customerCarRepository.findOne({
                where: { id: id },
                relations: relationsArray,
            });
            return car;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateCustomerCarDto, loginUser) {
        try {
            let car = await this.findOne(id);
            if (loginUser.role == enum_1.Role.ADMIN || car.user.id == loginUser.id) {
                car = await this.customerCarRepository.save(Object.assign(Object.assign({}, car), updateCustomerCarDto));
                return car;
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
            let car = await this.findOne(id);
            if (loginUser.role == enum_1.Role.ADMIN || car.user.id == loginUser.id) {
                car = await this.findOne(id);
                car.status = enum_1.CUSTOMER_CAR_STATUS.DELETED;
                car = await this.customerCarRepository.save(Object.assign({}, car));
                return car;
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
CustomerCarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_car_entity_1.CustomerCar)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UsersService])
], CustomerCarService);
exports.CustomerCarService = CustomerCarService;
//# sourceMappingURL=customer-car.service.js.map