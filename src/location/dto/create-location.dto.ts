import { IsNotEmpty, IsString } from "class-validator";

export class CreateLocationDto {

    @IsNotEmpty()
    @IsString()
    name: string; 

    @IsNotEmpty()
    @IsString()
    direction: string;

    @IsNotEmpty()
    @IsString()
    lat: string;

    @IsNotEmpty()
    @IsString()
    long: string;

}
