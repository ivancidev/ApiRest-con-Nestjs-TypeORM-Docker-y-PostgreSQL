import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccessLogDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    user:String

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    location:number

}
