import { IsNumber, IsOptional} from 'class-validator';

export class CallLogsParamsDto {
    @IsOptional()
    @IsNumber()
    recordsPerPage: number;

    @IsOptional()
    @IsNumber()
    page: number
}