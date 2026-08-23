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
    console.log('🔥🔥🔥 AUTH SERVICE LOGIN WAS CALLED 🔥🔥🔥');
    console.log('AUTH EMAIL:', JSON.stringify(data.email));

    const admin = await this.prisma.admin.findUnique({
      where: {
        email: data.email.trim().toLowerCase(),
      },
    });

    console.log(
      'AUTH ADMIN FOUND:',
      !!admin,
      admin
        ? {
            id: admin.id,
            email: admin.email,
            hashLength: admin.passwordHash.length,
          }
        : null,
    );

    if (!admin) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      admin.passwordHash,
    );

    console.log(
      'AUTH PASSWORD MATCHES:',
      passwordMatches,
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

    console.log('AUTH JWT CREATED');

    return {
      accessToken,
    };
  }
}