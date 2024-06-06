interface ValidatedUserProps {
  email: string;
  lastName: string;
  firstName: string;
  providerID: string;
  providerName: string;
  profilePhoto: string;
  accessToken: string;
  refreshToken: string;
  googleAccessToken: string;
  googleRefreshToken: string;
}

type UserPayloadProps = Pick<ValidatedUserProps, "email">;
