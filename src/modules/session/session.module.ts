import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionRepository } from "../session/session.repository";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { CinemaModule } from "../cinema/cinema.module";



@Module({
    imports: [
        forwardRef(() => CinemaModule),
        TypeOrmModule.forFeature([SessionRepository]),
    ],
    controllers: [SessionController],
    exports: [SessionService],
    providers: [SessionService],
})
export class SessionModule {}
