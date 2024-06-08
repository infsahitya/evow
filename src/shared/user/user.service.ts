import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import EmailSignupDTO from "src/auth/model/email-signup.dto";
import PrismaService from "src/global/prisma/prisma.service";
import LoggerService from "src/global/logger/logger.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { EmailSignupResponse } from "src/@types/auth";

@Injectable()
export default class UserService {
  private hashSaltRounds: number;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggerService,
  ) {
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
              phone: "",
              whatsapp: "",
            },
          },
        },
      });

      delete user.password;

      const temp = { ...user, email };

      return temp;
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
