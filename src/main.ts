import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";


async function bootstrap() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            transform: true,
            dismissDefaultMessages: true,
            exceptionFactory: (errors) => new UnprocessableEntityException(errors),
        }),
    );

    await app.listen(3000);
}

void bootstrap();


