import { IsUUID } from "class-validator";

export class CreateReservationsDto {
    @IsUUID('4')
    sessionId: string;

    @IsUUID('4',{each:true})
    sitsIds: string[];
}

