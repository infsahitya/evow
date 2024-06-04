import { registerAs } from "@nestjs/config";
import configConstant from "src/constant/config.constant";

export default registerAs(
  configConstant.namespaces.AUTH,
  (): AuthConfigProps => ({
    google: {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  }),
);
