import { AbstractDto } from "../../dto/abstract.dto";
import { CinemaEntity } from "../../../modules/cinema/cinema.entity";

export class CinemaDto extends AbstractDto{
    name: string;

    address: string;

    openAt: string;

    closeAt: string;

    constructor(cinemaEntity:CinemaEntity) {
        super(cinemaEntity);
        this.name = cinemaEntity.name;
        this.address = cinemaEntity.address;
        this.openAt = cinemaEntity.openAt;
        this.closeAt = cinemaEntity.closeAt;
    }
}
