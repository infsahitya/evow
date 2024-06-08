import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Contact, User } from "@prisma/client";
import EmailSignupDTO from "src/auth/model/email-signup.dto";
import PrismaService from "src/global/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface EmailSignupResponse
  extends Omit<User, "password">,
    Pick<Contact, "email"> {}

@Injectable()
export default class UserService {
  private hashSaltRounds: number;

  constructor(private readonly prismaService: PrismaService) {
    this.hashSaltRounds = 10;
  }

  async emailSignup(userDetails: EmailSignupDTO): Promise<EmailSignupResponse> {
    if (userDetails.password !== userDetails.confirmPassword) {
      throw new BadRequestException("Confirmed passwords does not match");
    }

    const { email } = userDetails;

    delete userDetails.email;
    delete userDetails.confirmPassword;

    try {
      const hashSalt = await bcrypt.genSalt(this.hashSaltRounds);
      const hashPass = await bcrypt.hash(userDetails.password, hashSalt);

      const user = await this.prismaService.user.create({
        data: {
          ...userDetails,
          password: hashPass,

          contact: {
            create: {
              email: email,
              phone: null!,
              whatsapp: null!,
            },
          },
        },
      });

      delete user.password;

      return { ...user, email };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new BadRequestException("Email already in use.");
      }

      throw new ForbiddenException("Some other error occurred.", {
        cause: error,
      });
    }
  }
}
