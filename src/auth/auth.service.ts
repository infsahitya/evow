import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import EmailSignupDTO from "./model/email-signup.dto";
import UserService from "src/shared/user/user.service";
import {
  EmailSignupResponse,
  EmailSignupValidatedProps,
} from "src/@types/auth";
import { AuthTokens } from "src/constant/token.constant";
import PrismaService from "src/global/prisma/prisma.service";
import LoggerService from "src/global/logger/logger.service";

@Injectable()
export default class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
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
    const accessToken = await this.generateToken(user, {
      type: "access",
    });
    const refreshToken = await this.generateToken(user, {
      type: "refresh",
    });

    try {
      const token = await this.prismaService.token.create({
        data: {
          access: accessToken,
          refresh: refreshToken,

          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return {
        ...user,
        [AuthTokens.ACCESS_TOKEN]: token.access,
        [AuthTokens.REFRESH_TOKEN]: token.refresh,
      };
    } catch (error) {
      this.logger.error(error, "Token push error");
    }
  }
}
