import { registerAs } from "@nestjs/config";
import { AuthConfigProps } from "src/@types/auth";
import { ConfigNamespaces } from "src/constant/config.constant";

export default registerAs(
  ConfigNamespaces.AUTH,
  (): AuthConfigProps => ({
    google: {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      accessTokenExp: process.env.ACCESS_TOKEN_EXP,
      refreshTokenExp: process.env.REFRESH_TOKEN_EXP,
    },
  }),
);
