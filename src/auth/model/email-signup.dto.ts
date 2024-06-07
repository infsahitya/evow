import { IsEmail, IsDefined, IsStrongPassword } from "class-validator";

export default class EmailSignupDTO {
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
