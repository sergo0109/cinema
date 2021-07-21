import { Column, Entity, OneToMany } from "typeorm";
import { ReservationEntity } from "../reservation/reservation.entity";
import { AbstractEntity } from "../../common/entities/abstract.entity";
import { UserDto } from "../../common/modules/user/user.dto";
import { RoleEnum } from "../../constants/role.enum";

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto>{
    @Column()
    name: string;

    @Column({type:'enum', enum: RoleEnum})
    role:RoleEnum;

    @OneToMany(
        () => ReservationEntity,
        (reservationEntity) => reservationEntity.user,
    )
    reservations: ReservationEntity[];

    dtoClass = UserDto;
}
