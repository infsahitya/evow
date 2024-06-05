import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";

interface AccessTokenPayload {
  sub: string;
  email: string;
}

interface RefreshTokenPayload {
  sub: string;
}

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {}

  generateToken(
    user: ValidatedUserProps,
    options: { type: "refresh" | "access" },
  ) {
    if (options.type === "access")
      return this.generateAccessToken({
        sub: user.email,
        email: user.email,
      });
    if (options.type === "refresh")
      return this.generateRefreshToken({
        sub: user.email,
      });
  }

  private generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.accessTokenExp,
    });
  }

  private generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.refreshTokenExp,
    });
  }
}
