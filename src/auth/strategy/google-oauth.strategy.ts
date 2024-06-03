import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Guards } from "src/@types/auth.guards";

@Injectable()
export default class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  Guards.GOOGLE_OAUTH,
) {}
