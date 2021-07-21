import { Injectable } from "@nestjs/common";
import { ReservationRepository } from "./reservation.repository";
import { ReservationDto } from "../../common/modules/reservation/reservation.dto";
import { ReservationEntity } from "./reservation.entity";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { CreateReservationsDto } from "./dto/create-reservations.dto";
import { ReservationCanNotCreateException } from "./exceptions/reservation-can-not-create.exception";
import { SessionService } from "../session/session.service";
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReservationService{
    constructor(private readonly _reservationRepository: ReservationRepository,
                public readonly sessionService:SessionService) {};

    @Transactional()
    async create(userId: string, createReservationsDto: CreateReservationsDto): Promise<ReservationDto[]>{
        try {
            const sessionEntity = await this.sessionService.getSessionEntity(createReservationsDto.sessionId);
            const sitsEntities = await this.sessionService.getSitsEntities(createReservationsDto.sitsIds);
            const reservationEntities: ReservationEntity[] = [];
            const reservationDtoes: ReservationDto[] = [];
            const reservationId = new uuid();
            for (const sitEntity of sitsEntities) {
                const reservationEntity = this._reservationRepository.create({
                    reservationId,
                    userId,
                    sessionId: createReservationsDto.sessionId,
                    sitId: sitEntity.id
                });

                reservationEntities.push(reservationEntity);
                reservationEntity.session = sessionEntity;
                reservationEntity.sit = sitEntity;
                reservationDtoes.push(reservationEntity.toDto());
            }

            await this._reservationRepository.save(reservationEntities);
            return reservationDtoes;
        } catch (err) {
            throw new ReservationCanNotCreateException(err);
        }
    }
}
