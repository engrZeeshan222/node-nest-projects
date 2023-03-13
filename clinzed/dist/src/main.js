"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Clinzed')
        .setDescription('Clinzed api collection')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new common_1.ValidationPipe());
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map