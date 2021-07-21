import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserReservationPageOptionsDto } from "./dto/user-reservation-page-options.dto";
import { ReservationDto } from "../../common/modules/reservation/reservation.dto";
import { UUIDParam } from "../../decorators/http.decorators";

@Controller('users')
export class UserController{
    constructor(public readonly userService: UserService) {}

    @Get(':id')
    async getUserReservations(@UUIDParam('id') userId, @Query() options: UserReservationPageOptionsDto):Promise<ReservationDto[]>{
        return this.userService.getUserReservations(userId, options);
    }
}
