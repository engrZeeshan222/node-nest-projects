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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const internal_note_service_1 = require("../internal-note/internal-note.service");
const apiFeatures_1 = require("../utils/apiFeatures");
const address_entity_1 = require("./entities/address.entity");
const relationsArray = ['property', 'internalNote'];
let AddressService = class AddressService {
    constructor(internalNoteService, addressRepository) {
        this.internalNoteService = internalNoteService;
        this.addressRepository = addressRepository;
    }
    async create(createAddressDto) {
        try {
            let address = this.addressRepository.create(createAddressDto);
            const internalNoteDto = {
                messageBody: createAddressDto.messageBody
            };
            if (internalNoteDto.messageBody) {
                address.internalNote = await this.internalNoteService.create(internalNoteDto);
            }
            address = await this.addressRepository.save(address);
            return address;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(queryParams, user) {
        try {
            const apiData = new apiFeatures_1.default(this.addressRepository, queryParams);
            apiData.paginate().includeFields(relationsArray);
            const filterData = apiData.filters(queryParams);
            if (Object.keys(filterData).length > 0) {
                const where = [filterData];
                apiData.where(where);
            }
            const address = await apiData.query();
            return address;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const address = await this.addressRepository.findOne({
                where: { id: id },
                relations: relationsArray,
            });
            return address;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateAddressDto) {
        try {
            let address = await this.findOne(id);
            address = await this.addressRepository.save(Object.assign(Object.assign({}, address), updateAddressDto));
            return address;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [internal_note_service_1.InternalNoteService,
        typeorm_2.Repository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map