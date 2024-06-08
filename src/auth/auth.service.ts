import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import EmailSignupDTO from "./model/email-signup.dto";
import UserService from "src/shared/user/user.service";
import {
  EmailLoginValidatedProps,
  EmailSignupValidatedProps,
} from "src/@types/auth";
import EmailLoginDTO from "./model/email-login.dto";
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

  async emailSignup(data: EmailSignupDTO): Promise<EmailSignupValidatedProps> {
    const user = await this.userService.emailSignup(data);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });
    const refreshToken = await this.jwtService.signAsync({
      sub: user.id,
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

  async emailLogin(data: EmailLoginDTO): Promise<EmailLoginValidatedProps> {
    const user = await this.userService.emailLogin(data);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });
    const refreshToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    try {
      const token = await this.prismaService.token.update({
        where: { userID: user.id },
        data: {
          access: accessToken,
          refresh: refreshToken,
        },
      });

      return {
        ...user,
        [AuthTokens.ACCESS_TOKEN]: token.access,
        [AuthTokens.REFRESH_TOKEN]: token.refresh,
      };
    } catch (error) {
      this.logger.error(error, "Token update error");
    }
  }
}
