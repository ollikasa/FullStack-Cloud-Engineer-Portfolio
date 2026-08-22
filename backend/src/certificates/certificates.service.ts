/*import { Injectable } from '@nestjs/common';

@Injectable()
export class CertificatesService {}
*/



import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.certificate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const certificate =
      await this.prisma.certificate.findUnique({
        where: { id },
      });

    if (!certificate) {
      throw new NotFoundException(
        'Certificate not found',
      );
    }

    return certificate;
  }

  create(data: CreateCertificateDto) {
    return this.prisma.certificate.create({
      data,
    });
  }

  async update(
    id: number,
    data: UpdateCertificateDto,
  ) {
    await this.findOne(id);

    return this.prisma.certificate.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.certificate.delete({
      where: { id },
    });
  }
}