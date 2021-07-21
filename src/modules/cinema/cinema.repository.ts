import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CinemaEntity } from "./cinema.entity";


@EntityRepository(CinemaEntity)
export class CinemaRepository extends Repository<CinemaEntity> {}
