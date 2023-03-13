"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("src/config/ormconfig");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_settings_module_1 = require("./modules/user-settings/user-settings.module");
const customer_car_module_1 = require("./modules/customer-car/customer-car.module");
const photo_module_1 = require("./modules/photo/photo.module");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const credit_card_module_1 = require("./modules/credit-card/credit-card.module");
const car_model_module_1 = require("./modules/car-model/car-model.module");
const car_make_module_1 = require("./modules/car-make/car-make.module");
const car_year_module_1 = require("./modules/car-year/car-year.module");
const car_color_module_1 = require("./modules/car-color/car-color.module");
const charger_type_module_1 = require("./modules/charger-type/charger-type.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const validation_1 = require("./config/validation");
const mail_module_1 = require("./modules/mail/mail.module");
const color_module_1 = require("./modules/color/color.module");
const nestjs_stripe_1 = require("nestjs-stripe");
const property_module_1 = require("./modules/property/property.module");
const internal_note_module_1 = require("./modules/internal-note/internal-note.module");
const address_module_1 = require("./modules/address/address.module");
const year_charger_type_module_1 = require("./modules/year-charger-type/year-charger-type.module");
const charger_property_module_1 = require("./modules/charger-property/charger-property.module");
const messages_module_1 = require("./modules/messages/messages.module");
const message_thread_module_1 = require("./modules/message-thread/message-thread.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./common/guards/roles.guard");
const fields_guard_1 = require("./common/guards/fields.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
                isGlobal: true,
                load: [configuration_1.default],
                validationSchema: validation_1.validationSchema,
            }),
            nestjs_stripe_1.StripeModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    apiKey: configService.get('STRIPE_SECRET_KEY'),
                    apiVersion: '2020-08-27',
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => (0, ormconfig_1.default)(configService),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            user_settings_module_1.UserSettingsModule,
            customer_car_module_1.CustomerCarModule,
            photo_module_1.PhotoModule,
            credit_card_module_1.CreditCardModule,
            car_model_module_1.CarModelModule,
            car_make_module_1.CarMakeModule,
            car_year_module_1.CarYearModule,
            car_color_module_1.CarColorModule,
            charger_type_module_1.ChargerTypeModule,
            color_module_1.ColorModule,
            property_module_1.PropertyModule,
            internal_note_module_1.InternalNoteModule,
            address_module_1.AddressModule,
            year_charger_type_module_1.YearChargerTypeModule,
            charger_property_module_1.ChargerPropertyModule,
            messages_module_1.MessagesModule,
            message_thread_module_1.MessageThreadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: fields_guard_1.FieldGuard,
            },],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map