import UserService from "./user.service";
import JwtGuard from "src/auth/guard/jwt.guard";
import { Controller, Get, UseGuards } from "@nestjs/common";

@Controller({
  path: "user",
  version: "1",
})
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("greet")
  @UseGuards(JwtGuard)
  hello() {
    return this.userService.hello();
  }
}
