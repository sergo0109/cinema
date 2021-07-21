

import { MovieRepository } from "./movie.repository";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
    imports: [
        TypeOrmModule.forFeature([MovieRepository]),
    ],
    controllers: [MovieController],
    exports: [MovieService],
    providers: [MovieService],
})
export class MovieModule {}
