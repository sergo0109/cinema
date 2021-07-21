import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReservationRepository } from "../reservation/reservation.repository";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";
import { SessionModule } from "../session/session.module";



@Module({
    imports: [
        forwardRef(() => SessionModule),
        TypeOrmModule.forFeature([ReservationRepository]),
    ],
    controllers: [ReservationController],
    exports: [ReservationService],
    providers: [ReservationService],
})
export class ReservationModule {}
