import { registerAs } from "@nestjs/config";
import Configs from "src/constant/config.constant";

export default registerAs(
  Configs.Namespaces.AUTH,
  (): AuthConfigProps => ({
    google: {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  }),
);
