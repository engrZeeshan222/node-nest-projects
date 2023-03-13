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
exports.ChargerPropertyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_service_1 = require("../property/property.service");
const apiFeatures_1 = require("../utils/apiFeatures");
const charger_property_entity_1 = require("./entities/charger-property.entity");
const relationsArray = ['chargerType', 'property'];
let ChargerPropertyService = class ChargerPropertyService {
    constructor(ChargerPropertyRepository, propertyService) {
        this.ChargerPropertyRepository = ChargerPropertyRepository;
        this.propertyService = propertyService;
    }
    async create(createChargerPropertyDto, user) {
        var _a;
        try {
            const property = await this.propertyService.findOne(Number(createChargerPropertyDto.property));
            if (property && ((_a = property.host) === null || _a === void 0 ? void 0 : _a.id) == user.id) {
                let chargerProperty = this.ChargerPropertyRepository.create(createChargerPropertyDto);
                chargerProperty = await this.ChargerPropertyRepository.save(chargerProperty);
                return chargerProperty;
            }
            else {
                throw new common_1.HttpException('FORBIDDEN! Only host can enter these details', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async createMany(arrayOfChargers) {
        const propertyChargers = await this.ChargerPropertyRepository.createQueryBuilder()
            .insert()
            .values(arrayOfChargers)
            .execute();
        return propertyChargers;
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.ChargerPropertyRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const filterData = apiData.filters(queryParams);
            if (Object.keys(filterData).length > 0) {
                const where = [filterData];
                apiData.where(where);
            }
            const chargerProperty = await apiData.query();
            return chargerProperty;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const carYear = await this.ChargerPropertyRepository.findOne({
                where: {
                    id,
                },
            });
            return carYear;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateChargerPropertyDto, user) {
        var _a;
        try {
            let chargerProperty = await this.ChargerPropertyRepository.findOne({
                where: {
                    id,
                },
                relations: relationsArray,
            });
            if (chargerProperty.property &&
                ((_a = chargerProperty.property.host) === null || _a === void 0 ? void 0 : _a.id) == user.id) {
                if (chargerProperty) {
                    chargerProperty = await this.ChargerPropertyRepository.save(Object.assign({}, chargerProperty));
                }
                return chargerProperty;
            }
            else {
                throw new common_1.HttpException('FORBIDDEN! Only host can enter these details', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id, user) {
        var _a;
        try {
            const chargerProperty = await this.ChargerPropertyRepository.findOne({
                where: {
                    id,
                },
                relations: relationsArray,
            });
            if (chargerProperty.property &&
                ((_a = chargerProperty.property.host) === null || _a === void 0 ? void 0 : _a.id) == user.id) {
                if (chargerProperty) {
                    await this.ChargerPropertyRepository.remove(chargerProperty);
                }
                return chargerProperty;
            }
            else {
                throw new common_1.HttpException('FORBIDDEN! Only host can enter these details', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
ChargerPropertyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(charger_property_entity_1.ChargerProperty)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => property_service_1.PropertyService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        property_service_1.PropertyService])
], ChargerPropertyService);
exports.ChargerPropertyService = ChargerPropertyService;
//# sourceMappingURL=charger-property.service.js.map