import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessLogDto } from './create-access-log.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAccessLogDto extends PartialType(CreateAccessLogDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    user:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    location:number
}
