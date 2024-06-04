import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import guardConstant from "src/constant/guard.constant";

@Injectable()
export default class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  guardConstant.tokens.GOOGLE_OAUTH,
) {}
