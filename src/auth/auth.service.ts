import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeService } from '../employe/employe.service';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
  	private employeService: EmployeService,
  	private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.employeService.findByUsername(username);

    const isMatchPass = await bcrypt.compare(pass, user.password);
    if (!isMatchPass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}