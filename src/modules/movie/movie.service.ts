import { MovieRepository } from "./movie.repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class MovieService {
    constructor(private readonly _movieRepository: MovieRepository) {};
}
