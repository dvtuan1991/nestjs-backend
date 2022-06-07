import { Controller } from "@nestjs/common";
import { User } from "./schema/user.schema";
import { UserService } from "./user.service";


@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  

}