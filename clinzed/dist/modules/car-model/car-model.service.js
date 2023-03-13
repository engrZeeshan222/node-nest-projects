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
exports.CarModelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const apiFeatures_1 = require("../utils/apiFeatures");
const car_model_entity_1 = require("./entities/car-model.entity");
const relationsArray = ['carMake', 'customerCars'];
let CarModelService = class CarModelService {
    constructor(carModelRepository) {
        this.carModelRepository = carModelRepository;
    }
    async create(createCarModelDto) {
        try {
            let carModel = this.carModelRepository.create(createCarModelDto);
            carModel = await this.carModelRepository.save(carModel);
            return carModel;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.carModelRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const filterData = apiData.filters(queryParams);
            if (user.role != enum_1.Role.ADMIN) {
                filterData['status'] = enum_1.COMMON_STATUS.ACTIVE;
            }
            if (Object.keys(filterData).length > 0) {
                const where = [filterData];
                apiData.where(where);
            }
            const carModels = await apiData.query();
            return carModels;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            let carModel = await this.carModelRepository.findOne({ where: { id } });
            carModel.status = enum_1.COMMON_STATUS.DELETED;
            carModel = await this.carModelRepository.save(Object.assign({}, carModel));
            return carModel;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
CarModelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_model_entity_1.CarModel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarModelService);
exports.CarModelService = CarModelService;
//# sourceMappingURL=car-model.service.js.map