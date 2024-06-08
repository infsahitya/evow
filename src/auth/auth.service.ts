import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import EmailSignupDTO from "./model/email-signup.dto";
import UserService, { EmailSignupResponse } from "src/shared/user/user.service";

interface EmailSignupValidatedProps extends EmailSignupResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(
    user: EmailSignupResponse,
    options: { type: "refresh" | "access" },
  ) {
    if (options.type === "refresh")
      return this.jwtService.signAsync({
        sub: user.id,
      });

    if (options.type === "access")
      return this.jwtService.signAsync({
        sub: user.id,
      });
  }

  async emailSignup(data: EmailSignupDTO): Promise<EmailSignupValidatedProps> {
    const user = await this.userService.emailSignup(data);

    return {
      ...user,
      access_token: await this.generateToken(user, { type: "access" }),
      refresh_token: await this.generateToken(user, { type: "refresh" }),
    };
  }
}
