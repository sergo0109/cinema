import { AbstractDto } from "../../dto/abstract.dto";
import { StatusEnum } from "../../../constants/status.enum";
import { SitEntity } from "../../../modules/cinema/sit.entity";


export class SitDto extends AbstractDto{
    pointX: number;

    pointY: number;

    status?: StatusEnum;

    constructor(sitEntity: SitEntity) {
        super(sitEntity);
        this.pointX = sitEntity.pointX;
        this.pointY = sitEntity.pointY;
    }
}
