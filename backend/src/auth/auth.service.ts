import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
