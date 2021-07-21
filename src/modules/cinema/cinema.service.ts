import { Injectable } from "@nestjs/common";
import { CinemaRepository } from "./cinema.repository";
import { SitRepository } from "./sit.repository";
import { CinemaPageOptionsDto } from "./dto/cinema-page-options.dto";
import { CinemaDto } from "../../common/modules/cinema/cinema.dto";
import { SitDto } from "../../common/modules/cinema/sit.dto";
import { CinemaEntity } from "./cinema.entity";
import { CinemaNotFountException } from "./exceptions/cinema-not-fount.exception";
import { SitEntity } from "./sit.entity";
import { SitNotFountException } from "./exceptions/sit-not-fount.exception";

@Injectable()
export class CinemaService {
    constructor( private readonly _cinemaRepository: CinemaRepository,
                 private readonly _sitRepository: SitRepository) {};

    async getAll(options: CinemaPageOptionsDto):Promise<CinemaDto[]>{
        const cinemaEntities = await this._cinemaRepository.createQueryBuilder('cinema')
            .orderBy('cinema.updatedAt',options.order)
            .getMany();

        const cinemaDtoes = cinemaEntities.map(cinemaEntity => cinemaEntity.toDto());

        return cinemaDtoes;

    }

    async getSits(cinemaId: string): Promise<SitDto[]>{
        const sitsEntities = await this._sitRepository.createQueryBuilder('sit')
            .where('sit.cinemaId = :cinemaId',{cinemaId})
            .getMany();

        const sitsDtoes = sitsEntities.map( sitEntity => sitEntity.toDto());

        return sitsDtoes;
    }


    async getSitsEntities(sitsIds: string[]): Promise<SitEntity[]>{
        const sitsEntities = await this._sitRepository.createQueryBuilder('sit')
            .where('sit.id in (:...sitsIds)',{sitsIds})
            .getMany();

        if(sitsEntities.length !== sitsIds.length){
            throw new SitNotFountException();
        }

        return sitsEntities;
    }
}
