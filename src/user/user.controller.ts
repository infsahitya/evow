import { Controller, Get } from "@nestjs/common";
import UserService from "./user.service";

@Controller({
  path: "user",
  version: "1",
})
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("greet")
  hello() {
    return this.userService.hello();
  }
}
