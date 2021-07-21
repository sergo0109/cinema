import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Unique } from "typeorm";

import { SitEntity } from "../cinema/sit.entity";
import { SessionEntity } from "../session/session.entity";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { ReservationDto } from "../../common/modules/reservation/reservation.dto";
import { UserEntity } from "../user/user.entity";

@Entity({ name: 'reservations' })
@Unique(['sitId', 'sessionId'])
export class ReservationEntity extends AbstractEntity<ReservationDto>{
    @Column({type:"uuid"})
    @Index()
    reservationId: string

    @Column()
    userId: string;

    @Column()
    sitId: string;

    @Column()
    sessionId: string;


    @ManyToOne(
        () => UserEntity,
        (userEntity) => userEntity.reservations,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(
        () => SitEntity,
        (sitEntity) => sitEntity.reservations,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'sit_id' })
    sit: SitEntity;

    @ManyToOne(
        () => SessionEntity,
        (cinemaMovieEntity) => cinemaMovieEntity.reservations,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'session_id' })
    session: SessionEntity;

    dtoClass = ReservationDto;
}
