import { Controller, Get, Query } from "@nestjs/common";
import { CinemaService } from "./cinema.service";
import { CinemaPageOptionsDto } from "./dto/cinema-page-options.dto";
import { CinemaDto } from "../../common/modules/cinema/cinema.dto";

@Controller('cinemas')
export class CinemaController {
    constructor(public readonly cinemaService: CinemaService) {}

    @Get()
    async getAll(@Query() options: CinemaPageOptionsDto): Promise<CinemaDto[]>{
        return this.cinemaService.getAll(options);
    }

}
