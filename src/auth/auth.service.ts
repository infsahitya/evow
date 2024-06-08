import {
  EmailLoginValidatedProps,
  EmailSignupValidatedProps,
} from "src/@types/auth";
import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth.config";
import EmailLoginDTO from "./model/email-login.dto";
import { Inject, Injectable } from "@nestjs/common";
import EmailSignupDTO from "./model/email-signup.dto";
import UserService from "src/shared/user/user.service";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AuthTokens } from "src/constant/token.constant";
import PrismaService from "src/global/prisma/prisma.service";
import LoggerService from "src/global/logger/logger.service";

@Injectable()
export default class AuthService {
  private refreshJwtSignOptions: JwtSignOptions;
  private accessJwtSignOptions: JwtSignOptions;

  constructor(
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {
    this.accessJwtSignOptions = {
      expiresIn: authConfigService.jwt.accessTokenExp,
    };
    this.refreshJwtSignOptions = {
      expiresIn: authConfigService.jwt.refreshTokenExp,
    };
  }

  async emailSignup(data: EmailSignupDTO): Promise<EmailSignupValidatedProps> {
    const user = await this.userService.emailSignup(data);
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      this.accessJwtSignOptions,
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      this.refreshJwtSignOptions,
    );

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
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      this.accessJwtSignOptions,
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      this.refreshJwtSignOptions,
    );

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
