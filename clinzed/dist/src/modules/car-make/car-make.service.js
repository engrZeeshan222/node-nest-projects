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
exports.CarMakeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const apiFeatures_1 = require("../utils/apiFeatures");
const car_make_entity_1 = require("./entities/car-make.entity");
const relationsArray = ['carModels'];
let CarMakeService = class CarMakeService {
    constructor(carMakeRepository) {
        this.carMakeRepository = carMakeRepository;
    }
    async create(createCarMakeDto) {
        try {
            let carMake = this.carMakeRepository.create(createCarMakeDto);
            carMake = await this.carMakeRepository.save(carMake);
            return carMake;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.carMakeRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const filterData = apiData.filters(queryParams);
            if (user.role != enum_1.Role.ADMIN) {
                filterData['status'] = enum_1.COMMON_STATUS.ACTIVE;
            }
            if (Object.keys(filterData).length > 0) {
                const where = [filterData];
                apiData.where(where);
            }
            const carMakes = await apiData.query();
            return carMakes;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            let carMake = await this.carMakeRepository.findOne({ where: { id } });
            carMake.status = enum_1.COMMON_STATUS.DELETED;
            carMake = await this.carMakeRepository.save(Object.assign({}, carMake));
            return carMake;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
CarMakeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_make_entity_1.CarMake)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarMakeService);
exports.CarMakeService = CarMakeService;
//# sourceMappingURL=car-make.service.js.map