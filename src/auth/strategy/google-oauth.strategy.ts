import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import guardConstant from "src/constant/guard.constant";
import configConstant from "src/constant/config.constant";
import LoggerService from "src/global/logger/logger.service";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export default class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  guardConstant.tokens.GOOGLE_OAUTH,
) {
  private config: AuthConfigProps;

  constructor(
    private readonly configSerivce: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    super({
      clientID: configSerivce.get<AuthConfigProps>(
        configConstant.namespaces.AUTH,
      ).google.clientID,
      callbackURL: configSerivce.get<AuthConfigProps>(
        configConstant.namespaces.AUTH,
      ).google.callbackURL,
      clientSecret: configSerivce.get<AuthConfigProps>(
        configConstant.namespaces.AUTH,
      ).google.clientSecret,
      scope: ["profile", "email"],
    });

    this.config = this.configSerivce.get(configConstant.namespaces.AUTH);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    this.loggerService.log(`Google Profile - ${JSON.stringify(profile)}`);

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
