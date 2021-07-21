import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationsDto } from "./dto/create-reservations.dto";
import { ReservationDto } from "../../common/modules/reservation/reservation.dto";
import { UUIDParam } from "../../decorators/http.decorators";

@Controller('reservations')
export class ReservationController{
    constructor(public readonly reservationService: ReservationService) {};

    @Post(':id')
    async create(@UUIDParam('id') userId, @Body() createReservationDto: CreateReservationsDto):Promise<ReservationDto[]>{
        return this.reservationService.create(userId, createReservationDto);
    }
}
