import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { SessionEntity } from "./session.entity";


@EntityRepository(SessionEntity)
export class SessionRepository extends Repository<SessionEntity> {}
