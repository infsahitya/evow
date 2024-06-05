import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {}

  generateAccessToken(user: any) {
    const { email } = user;
    const payload = { email };

    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.accessTokenExp,
    });
  }

  generateRefreshToken(user: any) {
    const { email } = user;
    const payload = { email };

    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.refreshTokenExp,
    });
  }
}
