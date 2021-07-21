import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { MovieEntity } from "./movie.entity";

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {}
