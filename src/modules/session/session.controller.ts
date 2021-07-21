import { Controller, Get, Query } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SessionPageOptionsDto } from "./dto/session-page-options.dto";
import { SessionDto } from "../../common/modules/session/session.dto";
import { SitFotSessionPageOptionsDto } from "./dto/sit-fot-session-page-options-dto";
import { SitDto } from "../../common/modules/cinema/sit.dto";
import { UUIDParam } from "../../decorators/http.decorators";

@Controller('sessions')
export class SessionController {
    constructor(public readonly sessionService: SessionService) {};

    @Get()
    async getAll(@Query() options: SessionPageOptionsDto): Promise<SessionDto[]>{
        return this.sessionService.getAll(options);
    }

    @Get(':id')
    async getSitsForSession(@UUIDParam('id') sessionId: string, @Query() options: SitFotSessionPageOptionsDto):Promise<SitDto[]>{
        return this.sessionService.getSitsForSession(sessionId,options);
    }

}
