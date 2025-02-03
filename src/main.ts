import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "node:process";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { useContainer } from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: "http://localhost:3000" // Cho phép yêu cầu từ http://localhost:3000
    });
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors) => {
            const result = errors.map((error) => ({
                property: error.property,
                message: error.constraints[Object.keys(error.constraints)[0]],
            }));
            return new BadRequestException(result);
        },
        stopAtFirstError: true,
    }));
    useContainer(app.select(AppModule), {fallbackOnErrors: true})
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',  // Truy cập file qua URL với /uploads/
    });
    await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
