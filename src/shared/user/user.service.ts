import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EmailSignupResponse } from "src/@types/auth";
import EmailLoginDTO from "src/auth/model/email-login.dto";
import EmailSignupDTO from "src/auth/model/email-signup.dto";
import PrismaService from "src/global/prisma/prisma.service";
import LoggerService from "src/global/logger/logger.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export default class UserService {
  private hashSaltRounds: number;

  constructor(
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
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

  async emailLogin(data: EmailLoginDTO) {
    const contact = await this.prismaService.contact.findUnique({
      where: {
        email: data.email,
      },
      include: {
        user: true,
      },
    });

    if (!contact.user)
      throw new NotFoundException(
        "No account associated with the provided email.",
      );

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      contact.user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException("Incorrect password.");
    }

    delete contact.id;
    delete contact.userID;
    delete contact.updatedAt;
    delete contact.createdAt;
    delete contact.user.password;

    return { ...contact };
  }
}
