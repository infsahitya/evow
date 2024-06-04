import { Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { GuardTokens } from "src/constant/guard.constant";

@Injectable()
export default class JwtStrategy extends PassportStrategy(
  Strategy,
  GuardTokens.JWT,
) {}
