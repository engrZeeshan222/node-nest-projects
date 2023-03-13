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
exports.ChargerTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const apiFeatures_1 = require("../utils/apiFeatures");
const charger_type_entity_1 = require("./entities/charger-type.entity");
const relationsArray = ['caryears'];
let ChargerTypeService = class ChargerTypeService {
    constructor(chargerTypeRepository) {
        this.chargerTypeRepository = chargerTypeRepository;
    }
    async create(createChargerTypeDto) {
        try {
            let chargerType = this.chargerTypeRepository.create(createChargerTypeDto);
            chargerType = await this.chargerTypeRepository.save(chargerType);
            return chargerType;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.chargerTypeRepository, queryParams);
            const filterData = apiData.filters(queryParams);
            if (user.role != enum_1.Role.ADMIN) {
                filterData['status'] = enum_1.COMMON_STATUS.ACTIVE;
            }
            if (Object.keys(filterData).length > 0) {
                const where = [filterData];
                apiData.where(where);
            }
            const chargerTypes = await apiData.query();
            return chargerTypes;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const chargerType = await this.chargerTypeRepository.findOne({
                where: { id: id },
                relations: relationsArray,
            });
            return chargerType;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateChargerTypeDto) {
        try {
            let chargerType = await this.chargerTypeRepository.findOne({
                where: {
                    id,
                },
            });
            chargerType = await this.chargerTypeRepository.save(Object.assign(Object.assign({}, chargerType), updateChargerTypeDto));
            return chargerType;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            let chargerType = await this.chargerTypeRepository.findOne({
                where: {
                    id,
                },
            });
            chargerType.status = enum_1.COMMON_STATUS.DELETED;
            chargerType = await this.chargerTypeRepository.save(Object.assign({}, chargerType));
            return chargerType;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
ChargerTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(charger_type_entity_1.ChargerType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChargerTypeService);
exports.ChargerTypeService = ChargerTypeService;
//# sourceMappingURL=charger-type.service.js.map