import { Injectable } from "@nestjs/common";
import LoggerService from "src/global/logger/logger.service";

@Injectable()
export default class AuthService {
  constructor(
    private readonly loggerService: LoggerService,
    // private readonly jwtService: JwtService,
  ) {}

  private generateJwt(payload: GoogleOAuthPayloadProps) {
    // return this.jwtService.sign(payload);
    return payload;
  }

  signIn(user: any) {
    return this.generateJwt({ email: user.email });
  }

  signUp(user: any) {
    return this.generateJwt({ email: user.email });
  }
}
