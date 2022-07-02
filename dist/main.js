"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setVersion('1.0')
        .addTag('nfts')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map