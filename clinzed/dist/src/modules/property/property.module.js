"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModule = void 0;
const common_1 = require("@nestjs/common");
const property_service_1 = require("./property.service");
const property_controller_1 = require("./property.controller");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("./entities/property.entity");
const address_module_1 = require("../address/address.module");
const charger_property_module_1 = require("../charger-property/charger-property.module");
const internal_note_module_1 = require("../internal-note/internal-note.module");
let PropertyModule = class PropertyModule {
};
PropertyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([property_entity_1.Property]),
            internal_note_module_1.InternalNoteModule,
            address_module_1.AddressModule,
            (0, common_1.forwardRef)(() => charger_property_module_1.ChargerPropertyModule),
        ],
        controllers: [property_controller_1.PropertyController],
        providers: [property_service_1.PropertyService],
        exports: [property_service_1.PropertyService],
    })
], PropertyModule);
exports.PropertyModule = PropertyModule;
//# sourceMappingURL=property.module.js.map