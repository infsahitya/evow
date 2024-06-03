import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import Guards from "src/constant/guard.constant";

@Injectable()
export default class GoogleOAuthGuard extends AuthGuard(
  Guards.Tokens.GOOGLE_OAUTH,
) {}
