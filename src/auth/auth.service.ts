import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";

interface AccessTokenPayload {
  type: "access";
  data: {
    sub: string;
    email: string;
  };
}

interface RefreshTokenPayload {
  type: "refresh";
  data: {
    sub: string;
  };
}

type Payload = AccessTokenPayload | RefreshTokenPayload;

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {}

  generateToken(payload: Payload) {
    if (payload.type === "access")
      return this.generateAccessToken({
        sub: payload.data.email,
        email: payload.data.email,
      });
    if (payload.type === "refresh")
      return this.generateRefreshToken({
        sub: payload.data.sub,
      });
  }

  private generateAccessToken(payload: AccessTokenPayload["data"]): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.accessTokenExp,
    });
  }

  private generateRefreshToken(payload: RefreshTokenPayload["data"]): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.refreshTokenExp,
    });
  }
}
