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
}
