import { formatObj } from "src/utils";
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
    this.loggerService.log(`Google OAuth Profile - ${formatObj(_profile)}`);

    const { id, name, emails, photos } = _profile;

    const user = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
