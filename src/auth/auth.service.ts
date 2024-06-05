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

  generateToken(
    user: ValidatedUserProps,
    options: { type: "refresh" | "access" },
  ) {
    const { email } = user;
    const payload = { email };

    if (options.type === "access") return this.generateAccessToken(payload);
    if (options.type === "refresh") return this.generateRefreshToken(payload);
  }

  private generateAccessToken(payload: UserPayloadProps) {
    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.accessTokenExp,
    });
  }

  private generateRefreshToken(payload: UserPayloadProps) {
    return this.jwtService.sign(payload, {
      expiresIn: this.authConfigService.jwt.refreshTokenExp,
    });
  }
}
