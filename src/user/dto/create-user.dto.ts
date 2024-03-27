import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateUserDto {
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
