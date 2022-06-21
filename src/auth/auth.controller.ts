import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // console.log(req.user);
    console.log('controller');

    return this.authService.login(req.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getProfile(@Request() req) {
    console.log(req.user);
    const findUser = await this.userService.findUserById(req.user.id);
    console.log(findUser);
    return findUser;
  }
}
