import { AbstractDto } from "../../dto/abstract.dto";
import { UserEntity } from "../../../modules/user/user.entity";
import { RoleEnum } from "../../../constants/role.enum";


export class UserDto extends AbstractDto{
    name: string;
    role: RoleEnum;
    reservationsIds?: string[];

    constructor(userEntity: UserEntity) {
        super(userEntity);
        this.name = userEntity.name;
        this.role = userEntity.role;
        this.reservationsIds = userEntity.reservations?.map(reservation => reservation.id);
    }
}
