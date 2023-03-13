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
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("src/common/enum");
const typeorm_2 = require("typeorm");
const address_service_1 = require("../address/address.service");
const charger_property_service_1 = require("../charger-property/charger-property.service");
const internal_note_service_1 = require("../internal-note/internal-note.service");
const apiFeatures_1 = require("../utils/apiFeatures");
const property_entity_1 = require("./entities/property.entity");
const relationsArray = ['address', 'internalNote', 'host'];
let PropertyService = class PropertyService {
    constructor(addressService, internalNoteService, propertyRepository, chargerPropertyService) {
        this.addressService = addressService;
        this.internalNoteService = internalNoteService;
        this.propertyRepository = propertyRepository;
        this.chargerPropertyService = chargerPropertyService;
    }
    async create(createPropertyDto, loginUser) {
        var _a;
        try {
            if (Object.keys(createPropertyDto.address).length == 0) {
                throw new common_1.HttpException('Please provide address', common_1.HttpStatus.BAD_REQUEST);
            }
            const address = await this.addressService.create(createPropertyDto.address);
            if (address) {
                createPropertyDto.address = address;
                let internalNoteDto = {
                    messageBody: createPropertyDto.messageBody
                };
                let property = await this.propertyRepository.create(createPropertyDto);
                property.host = loginUser;
                if (internalNoteDto.messageBody) {
                    property.internalNote = await this.internalNoteService.create(internalNoteDto);
                }
                property = await this.propertyRepository.save(property);
                if (property && createPropertyDto.chargers) {
                    (_a = createPropertyDto.chargers) === null || _a === void 0 ? void 0 : _a.forEach((ele) => {
                        ele.property = property;
                    });
                    this.chargerPropertyService.createMany(createPropertyDto.chargers);
                }
                return property;
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.propertyRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            if (user.role != enum_1.Role.ADMIN) {
                const data2 = {
                    status: enum_1.PROPERTY_STATUS.LISTED,
                };
                const where = [data2];
                apiData.where(where);
            }
            const property = await apiData.query();
            return property;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const property = await this.propertyRepository.findOne({
                where: { id: id },
                relations: relationsArray,
            });
            return property;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updatePropertyDto, loginUser) {
        var _a;
        try {
            let property = await this.findOne(id);
            property.host;
            if (loginUser.role == enum_1.Role.ADMIN || ((_a = property.host) === null || _a === void 0 ? void 0 : _a.id) == (loginUser === null || loginUser === void 0 ? void 0 : loginUser.id)) {
                property = await this.propertyRepository.save(Object.assign(Object.assign({}, property), updatePropertyDto));
            }
            return property;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async pauseProperty(id, loginUser) {
        try {
            let property = await this.findOne(id);
            if (loginUser.role == enum_1.Role.ADMIN || property.host.id == loginUser.id) {
                property.status = enum_1.PROPERTY_STATUS.PAUSED;
                property = await this.propertyRepository.save(Object.assign({}, property));
            }
            return property;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id, loginUser) {
        try {
            let property = await this.findOne(id);
            if (loginUser.role == enum_1.Role.ADMIN || property.host.id == loginUser.id) {
                property.status = enum_1.PROPERTY_STATUS.DELETED;
                property = await this.propertyRepository.save(Object.assign({}, property));
            }
            return property;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async average(zipCode) {
        try {
            const properties = await this.propertyRepository.find({
                where: {
                    address: {
                        zip: zipCode,
                    },
                },
            });
            let avg = 0;
            properties.forEach((ele) => {
                avg = avg + ele.costPerMinute;
            });
            return avg / properties.length;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => charger_property_service_1.ChargerPropertyService))),
    __metadata("design:paramtypes", [address_service_1.AddressService,
        internal_note_service_1.InternalNoteService,
        typeorm_2.Repository,
        charger_property_service_1.ChargerPropertyService])
], PropertyService);
exports.PropertyService = PropertyService;
//# sourceMappingURL=property.service.js.map