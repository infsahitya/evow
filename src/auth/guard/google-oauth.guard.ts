import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import guardConstant from "src/constant/guard.constant";

@Injectable()
export default class GoogleOAuthGuard extends AuthGuard(
  guardConstant.tokens.GOOGLE_OAUTH,
) {}
