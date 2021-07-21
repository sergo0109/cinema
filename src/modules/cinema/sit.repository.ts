import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { SitEntity } from "./sit.entity";


@EntityRepository(SitEntity)
export class SitRepository extends Repository<SitEntity> {}
