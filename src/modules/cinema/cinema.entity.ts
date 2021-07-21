import { Column, Entity, OneToMany } from "typeorm";
import { SessionEntity } from "../session/session.entity";
import { SitEntity } from "./sit.entity";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { CinemaDto } from "../../common/modules/cinema/cinema.dto";

@Entity({ name: 'cinemas' })
export class CinemaEntity extends AbstractEntity<CinemaDto>{
    @Column({unique:true})
    name: string;

    @Column()
    address: string;

    @Column()
    openAt: string;

    @Column()
    closeAt: string;

    @OneToMany(
        () => SitEntity,
        (sitEntity) => sitEntity.cinema,
    )
    sits: SitEntity[];

    @OneToMany(
        () => SessionEntity,
        (sessionEntity) => sessionEntity.cinema,
    )
    sessions: SessionEntity[];

    dtoClass = CinemaDto;
}
