import { AbstractDto } from "../../dto/abstract.dto";
import { MovieEntity } from "../../../modules/movie/movie.entity";


export class MovieDto extends AbstractDto{
    title:string;
    description:string;
    duration: number;

    constructor(movieEntity: MovieEntity) {
        super(movieEntity);
        this.title = movieEntity.title;
        this.description = movieEntity.description;
        this.duration = movieEntity.duration;
    }
}
