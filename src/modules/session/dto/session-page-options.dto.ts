import { PageOptionsDto } from "../../../common/dto/page-options.dto";
import { IsDateString, IsEnum, IsOptional, IsUUID } from "class-validator";
import { StatusEnum } from "../../../constants/status.enum";

export class SessionPageOptionsDto extends PageOptionsDto{
    @IsOptional()
    @IsUUID('4')
    cinemaId?: string;

    @IsOptional()
    @IsUUID('4')
    movieId?: string;

    @IsOptional()
    @IsDateString()
    dateFrom?: Date;

    @IsOptional()
    @IsDateString()
    dateTill?: Date;

    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;
}
