import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(userName);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log('validate', result);

      return result;
    }
    return null;
  }

  async login(data: any) {
    const payload = {
      userName: data.userName,
      id: data.id,
      email: data.email,
      name: data.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
      isAdmin: data.isAdmin,
    };
  }
}
