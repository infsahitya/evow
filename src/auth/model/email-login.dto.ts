import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class EmailLoginDTO {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
