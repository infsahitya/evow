import {
  IsEmail,
  IsDefined,
  IsStrongPassword,
  IsString,
  IsNotEmpty,
} from "class-validator";

export default class EmailSignupDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;

  @IsDefined()
  @IsStrongPassword()
  confirmPassword: string;
}
