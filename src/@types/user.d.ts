interface ValidatedUserProps {
  email: string;
  lastName: string;
  firstName: string;
  providerID: string;
  providerName: string;
  profilePhoto: string;
}

type UserPayloadProps = Pick<ValidatedUserProps, "email">;
