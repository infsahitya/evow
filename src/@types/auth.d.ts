import { Contact, User } from "@prisma/client";

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
  access_token: string;
  refresh_token: string;
}
