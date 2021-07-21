import { IsDateString, IsOptional } from "class-validator";
import { PageOptionsDto } from "../../../common/dto/page-options.dto";

export class UserReservationPageOptionsDto extends PageOptionsDto{
    @IsOptional()
    @IsDateString()
    dateFrom?: Date;

    @IsOptional()
    @IsDateString()
    dateTill?: Date;
}
