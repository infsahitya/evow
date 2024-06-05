import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { GuardTokens } from "src/constant/guard.constant";
import LoggerService from "src/global/logger/logger.service";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export default class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  GuardTokens.GOOGLE_OAUTH,
) {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: authConfigService.google.clientID,
      callbackURL: authConfigService.google.callbackURL,
      clientSecret: authConfigService.google.clientSecret,
      scope: ["profile", "email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    _profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    this.loggerService.log(_profile, "Google OAuth");

    const {
      id: providerID,
      provider: providerName,
      emails: [{ value: email }],
      photos: [{ value: profilePhoto }],
      name: { familyName: lastName, givenName: firstName },
    } = _profile;

    const user = {
      providerID,
      providerName,
      email,
      firstName,
      lastName,
      profilePhoto,
    };

    done(null, user);
  }
}
