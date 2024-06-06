import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserService {
  constructor() {}

  hello() {
    return "Hello";
  }
}
