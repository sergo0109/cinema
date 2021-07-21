import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CinemaEntity } from "../cinema/cinema.entity";
import { MovieEntity } from "../movie/movie.entity";
import { ReservationEntity } from "../reservation/reservation.entity";
import { SessionDto } from "../../common/modules/session/session.dto";
import { AbstractEntity } from "../../common/entities/abstract.entity";

@Entity({name: 'sessions '})
export class SessionEntity extends AbstractEntity<SessionDto>{
    @Column({ type: 'uuid' })
    cinemaId: string;

    @Column({ type: 'uuid' })
    movieId: string;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'start_at',
    })
    startAt: Date;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'end_at',
    })
    endAt: Date;

    @ManyToOne(
        () => CinemaEntity,
        (cinemaEntity) => cinemaEntity.sessions,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'cinema_id' })
    cinema: CinemaEntity;

    @ManyToOne(
        () => MovieEntity,
        (movieEntity) => movieEntity.sessions,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'movie_id' })
    movie: MovieEntity;

    @OneToMany(
        () => ReservationEntity,
        (reservationEntity) => reservationEntity.session,
    )
    reservations: ReservationEntity[];

    dtoClass = SessionDto;

}
