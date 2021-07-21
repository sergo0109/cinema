import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { CinemaEntity } from "./cinema.entity";
import { ReservationEntity } from "../reservation/reservation.entity";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { SitDto } from "../../common/modules/cinema/sit.dto";

@Entity({ name: 'sits' })
@Unique(['cinemaId','pointX','pointY'])
export class SitEntity extends AbstractEntity<SitDto>{
    @Column({ type:"uuid" })
    cinemaId: string

    @Column()
    pointX: number;

    @Column()
    pointY: number;

    @ManyToOne(
        () => CinemaEntity,
        (cinemaEntity) => cinemaEntity.sits,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'cinema_id' })
    cinema: CinemaEntity;

    @OneToMany(
        () => ReservationEntity,
        (reservationEntity) => reservationEntity.sit,
    )
    reservations: ReservationEntity[];

    dtoClass = SitDto;
}
