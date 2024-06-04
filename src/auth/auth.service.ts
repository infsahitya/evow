import { Injectable } from "@nestjs/common";

@Injectable()
export default class AuthService {
  constructor() {}

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
