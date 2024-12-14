"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
        app.enableCors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"],
        });
        const port = process.env.PORT ?? 3000;
        await app.listen(port, "0.0.0.0");
        console.log(`Aplicação rodando na porta ${port}`);
    }
    catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map