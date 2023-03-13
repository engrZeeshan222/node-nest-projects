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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const apiFeatures_1 = require("../utils/apiFeatures");
const color_entity_1 = require("./entities/color.entity");
const relationsArray = ['carColors'];
let ColorService = class ColorService {
    constructor(colorRepository) {
        this.colorRepository = colorRepository;
    }
    async create(createColorDto) {
        try {
            let color = this.colorRepository.create(createColorDto);
            color = await this.colorRepository.save(createColorDto);
            return color;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.colorRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            if (user.role != enum_1.Role.ADMIN) {
                const data2 = {
                    status: enum_1.COMMON_STATUS.ACTIVE,
                };
                const where = [data2];
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
            const color = await this.colorRepository.findOne({
                where: { id: id },
                relations: relationsArray,
            });
            return color;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
ColorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(color_entity_1.Color)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColorService);
exports.ColorService = ColorService;
//# sourceMappingURL=color.service.js.map