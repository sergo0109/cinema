import { Controller, Get, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller('movies')
export class MovieController{
    constructor(public readonly movieService: MovieService) {}
}
