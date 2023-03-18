import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { Media } from "../entities/media.entities";
import { MediaStatusEnum, MediaTypeEnum } from "../enum/media.enum";
import { PartialType } from '@nestjs/mapped-types';

export class MediaDto {
    @IsNotEmpty()
    @IsEnum(MediaTypeEnum)
    type: MediaTypeEnum;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    description?: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @IsOptional()
    @IsEnum(MediaTypeEnum)
    status?: MediaStatusEnum;
}

export class UpdateMediaDto extends PartialType(MediaDto) {}

export class PaginationDto {
    @IsOptional()
    page: number = 1;

    @IsOptional()
    limit: number = 10;
}

export class MediaReturnDto {
    data: Media[];
    count: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    message?: string;
    staus?: number;
}