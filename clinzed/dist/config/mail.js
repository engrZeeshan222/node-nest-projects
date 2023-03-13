"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportOption = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const transportOption = async (configService) => {
    const configuration = {
        transport: {
            host: configService.get('MAIL_HOST'),
            port: configService.get('MAIL_PORT'),
            secure: false,
            auth: {
                user: configService.get('MAIL_USER'),
                pass: configService.get('SENDGRID_API_KEY'),
            },
        },
        defaults: {
            from: configService.get('EMAIL_FROM'),
        },
        template: {
            dir: (0, path_1.join)(__dirname, './../modules/mail/templates'),
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    };
    return configuration;
};
exports.transportOption = transportOption;
//# sourceMappingURL=mail.js.map