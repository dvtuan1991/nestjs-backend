import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: User) {
    return this.userService.createUser(data);
  }

  @Get('adminstatic')
  async geTotalQuantity () {
    return await this.userService.getTotalUser();
  }
}
