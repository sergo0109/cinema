import { IsEnum, IsOptional } from "class-validator";
import { StatusEnum } from "../../../constants/status.enum";
import { PageOptionsDto } from "../../../common/dto/page-options.dto";


export class SitFotSessionPageOptionsDto extends PageOptionsDto {
    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;
}
