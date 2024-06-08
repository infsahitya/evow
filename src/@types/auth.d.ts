import { Contact, User } from "@prisma/client";
import { AuthTokens } from "src/constant/token.constant";

interface AuthConfigProps {
  google: {
    clientID: string;
    callbackURL: string;
    clientSecret: string;
  };
  jwt: {
    secret: string;
    accessTokenExp: string;
    refreshTokenExp: string;
  };
}

interface GoogleOAuthPayloadProps {
  email: string;
}

interface EmailSignupResponse
  extends Omit<User, "password">,
    Pick<Contact, "email"> {}

interface EmailSignupValidatedProps extends EmailSignupResponse {
  [AuthTokens.ACCESS_TOKEN]: string;
  [AuthTokens.REFRESH_TOKEN]: string;
}
