import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CinemaRepository } from "./cinema.repository";
import { SitRepository } from "./sit.repository";
import { CinemaService } from "./cinema.service";
import { CinemaController } from "./cinema.controller";



@Module({
    imports: [
        TypeOrmModule.forFeature([CinemaRepository, SitRepository]),
    ],
    controllers: [CinemaController],
    exports: [CinemaService],
    providers: [CinemaService],
})
export class CinemaModule {}
