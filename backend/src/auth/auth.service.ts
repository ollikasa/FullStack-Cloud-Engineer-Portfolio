/*import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {}
*/






import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!admin) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
    };

    const accessToken =
      await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}