import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserReservationPageOptionsDto } from "./dto/user-reservation-page-options.dto";
import { ReservationDto } from "../../common/modules/reservation/reservation.dto";

@Injectable()
export class UserService{
    constructor(private readonly _userRepository: UserRepository) {}

    async getUserReservations(userId: string, options: UserReservationPageOptionsDto):Promise<ReservationDto[]>{
        const queryBuilder = this._userRepository.createQueryBuilder('user')
            .where('user.id = :userId',{userId})
            .leftJoinAndSelect('user.reservations','reservation')
            .leftJoinAndSelect('reservation.sit','sit')
            .leftJoinAndSelect('reservation.session','session')
            .leftJoinAndSelect('session.movie','movie')
            .leftJoinAndSelect('session.cinema','cinema');

        if(options.dateFrom){
            queryBuilder.andWhere('session.startAt > :date',{ date: options.dateFrom });
        }

        if(options.dateTill){
            queryBuilder.andWhere('session.startAt < :date',{ date: options.dateTill });
        }

        const reservationsDtoes = (await queryBuilder.getOne()).reservations?.map( reservation => reservation.toDto());

        return reservationsDtoes;
    }
}
