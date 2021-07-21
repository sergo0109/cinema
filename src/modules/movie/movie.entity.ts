import { Column, Entity, OneToMany } from "typeorm";
import { SessionEntity } from "../session/session.entity";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { MovieDto } from "../../common/modules/movie/movie.dto";

@Entity({ name: 'movies' })
export class MovieEntity extends AbstractEntity<MovieDto>{
    @Column({ unique:true })
    title: string;

    @Column()
    duration: number;

    @Column()
    description: string;

    @OneToMany(
        () => SessionEntity,
        (sessionEntity) => sessionEntity.movie,
    )
    sessions: SessionEntity[];

    dtoClass = MovieDto;
}
