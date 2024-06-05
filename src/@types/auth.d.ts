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
