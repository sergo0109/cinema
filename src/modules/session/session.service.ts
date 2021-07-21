import { Injectable } from "@nestjs/common";
import { SessionRepository } from "./session.repository";
import { SessionPageOptionsDto } from "./dto/session-page-options.dto";
import { SessionDto } from "../../common/modules/session/session.dto";
import { SitFotSessionPageOptionsDto } from "./dto/sit-fot-session-page-options-dto";
import { SitDto } from "../../common/modules/cinema/sit.dto";
import { StatusEnum } from "../../constants/status.enum";
import { CinemaService } from "../cinema/cinema.service";
import _ from "lodash";
import { SessionEntity } from "./session.entity";
import { SessionNotFoundException } from "./exception/session-not-found.exception";
import { SitEntity } from "../cinema/sit.entity";

@Injectable()
export class SessionService{
    constructor(private readonly _sessionRepository: SessionRepository,
                public readonly cinemaService: CinemaService) {};

    async getAll(options: SessionPageOptionsDto): Promise<SessionDto[]> {
        const queryBuilder = this._sessionRepository.createQueryBuilder('session');

        if(options.cinemaId){
            queryBuilder.where('session.cinemaId = :cinemaId',{ cinemaId: options.cinemaId });
        }

        if (options.movieId){
            queryBuilder.andWhere('session.movieId = :movieId',{ movieId: options.movieId });
        }

        if(options.dateFrom){
            queryBuilder.andWhere('session.startAt > :date',{ date: options.dateFrom });
        }

        if(options.dateTill){
            queryBuilder.andWhere('session.startAt < :date',{ date: options.dateTill });
        }

        if(options.status){
            const date = new Date();
            if(options.status === StatusEnum.AVAILABLE) {
                queryBuilder.andWhere('session.startAt > :date', { date });
            }else {
                queryBuilder.andWhere('session.startAt < :date', { date });
            }
        }

        const sessionEntities = await queryBuilder.orderBy('session.startAt',options.order)
            .leftJoinAndSelect('session.movie','movie')
            .leftJoinAndSelect('session.cinema','cinema')
            .getMany();

        const sessionDtoes = sessionEntities.map(session => session.toDto());

        return sessionDtoes;
    }

    async getSitsForSession(sessionId: string, options: SitFotSessionPageOptionsDto): Promise<SitDto[]> {
        const sessionEntity = await this._sessionRepository.createQueryBuilder('session')
            .where('session.id = :sessionId',{sessionId})
            .leftJoinAndSelect('session.reservations','reservation')
            .getOne();

            const reservedSitsIds = sessionEntity.reservations.map(reservation => reservation.sitId);

            const sitsDtoes = await this.cinemaService.getSits(sessionEntity.cinemaId);

            for (const sitDto of sitsDtoes){
                for(const sitId of reservedSitsIds){
                    if(sitId === sitDto.id){
                        sitDto.status = StatusEnum.UNAVAILABLE;
                        break;
                    }
                }

                if(sitDto.status !== StatusEnum.UNAVAILABLE){
                    sitDto.status = StatusEnum.AVAILABLE;
                }
            }

            if(options.status){
                return _.remove(sitsDtoes,sitDto => sitDto.status === options.status);
            }

            return sitsDtoes;
    }

    async getSessionEntity(sessionId: string): Promise<SessionEntity>{
        const sessionEntity = await this._sessionRepository.createQueryBuilder('session')
            .where('session.id = :sessionId',{sessionId})
            .leftJoinAndSelect('session.movie','movie')
            .leftJoinAndSelect('session.cinema','cinema')
            .getOne();

        if(!sessionEntity){
            throw new SessionNotFoundException();
        }

        return sessionEntity;
    }

    async getSitsEntities(sitsIds:string[]):Promise<SitEntity[]>{
        return this.cinemaService.getSitsEntities(sitsIds);
    }
}

