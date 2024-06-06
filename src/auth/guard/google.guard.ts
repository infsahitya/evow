import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GuardTokens } from "src/constant/guard.constant";

@Injectable()
export default class GoogleOAuthGuard extends AuthGuard(
  GuardTokens.GOOGLE_OAUTH,
) {}
