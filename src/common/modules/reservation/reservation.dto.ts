import { AbstractDto } from "../../dto/abstract.dto";
import { SitDto } from "../cinema/sit.dto";
import { SessionDto } from "../session/session.dto";
import { ReservationEntity } from "../../../modules/reservation/reservation.entity";

export class ReservationDto extends AbstractDto{
    reservationId: string;
    userId: string;
    session: SessionDto;
    sit: SitDto;

    constructor(reservationEntity: ReservationEntity) {
        super(reservationEntity);
        this.reservationId = reservationEntity.reservationId;
        this.userId = reservationEntity.userId;
        this.session = reservationEntity.session.toDto();
        this.sit = reservationEntity.sit.toDto();
    }
}
