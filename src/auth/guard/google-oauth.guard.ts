import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Guards } from "src/@types/auth.guards";

@Injectable()
export default class GoogleOAuthGuard extends AuthGuard(Guards.GOOGLE_OAUTH) {}
