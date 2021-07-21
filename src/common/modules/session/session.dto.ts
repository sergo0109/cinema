import { AbstractDto } from "../../dto/abstract.dto";
import { CinemaDto } from "../cinema/cinema.dto";
import { MovieDto } from "../movie/movie.dto";
import { SessionEntity } from "../../../modules/session/session.entity";

export class SessionDto extends AbstractDto{
    cinema: CinemaDto;
    movie: MovieDto;
    startAt: Date;
    endAt: Date;
    reservationsIds?: string[];

    constructor(sessionEntity: SessionEntity) {
        super(sessionEntity);
        this.cinema = sessionEntity.cinema.toDto();
        this.movie = sessionEntity.movie.toDto();
        this.startAt = sessionEntity.startAt;
        this.endAt = sessionEntity.endAt;
        this.reservationsIds = sessionEntity.reservations?.map(reservation => reservation.id);

    }
}
