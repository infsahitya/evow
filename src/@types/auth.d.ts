interface AuthConfigProps {
  google: {
    clientID: string;
    callbackURL: string;
    clientSecret: string;
  };
  jwt: {
    secret: string,
  }
}

interface GoogleOAuthPayloadProps {
  email: string;
}
