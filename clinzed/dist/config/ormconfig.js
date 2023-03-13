"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionOptions = void 0;
const connectionOptions = (configService) => {
    const development = {
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        logging: false,
        entities: [__dirname + '/../modules/**/entities/*.entity.{js,ts}'],
        migrations: [__dirname + '/../migration/*.{js,ts}'],
        subscribers: ['src/subscriber/**/*.ts'],
        dropSchema: false,
    };
    return development;
};
exports.connectionOptions = connectionOptions;
exports.default = exports.connectionOptions;
//# sourceMappingURL=ormconfig.js.map