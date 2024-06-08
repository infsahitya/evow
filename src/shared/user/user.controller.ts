import UserService from "./user.service";
import { Controller } from "@nestjs/common";

@Controller({
  path: "user",
  version: "1",
})
export default class UserController {
  constructor(private readonly userService: UserService) {}
}
