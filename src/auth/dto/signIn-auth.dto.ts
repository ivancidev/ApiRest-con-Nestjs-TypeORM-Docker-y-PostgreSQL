import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
