/*import { Injectable } from '@nestjs/common';

@Injectable()
export class EducationService {}
*/



import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.education.findMany({
      orderBy: {
        endYear: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const education = await this.prisma.education.findUnique({
      where: { id },
    });

    if (!education) {
      throw new NotFoundException(
        'Education record not found',
      );
    }

    return education;
  }

  async create(data: CreateEducationDto) {
    return this.prisma.education.create({
      data,
    });
  }

  async update(
    id: number,
    data: UpdateEducationDto,
  ) {
    await this.findOne(id);

    return this.prisma.education.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.education.delete({
      where: { id },
    });
  }
}