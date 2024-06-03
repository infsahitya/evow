import { registerAs } from "@nestjs/config";
import { ConfigNamespaces } from "src/@types/config.namespace";

export default registerAs(
  ConfigNamespaces.AUTH,
  (): AuthConfigProps => ({
    google: {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  }),
);
