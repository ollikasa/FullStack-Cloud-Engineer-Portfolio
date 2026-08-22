/*import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {}
*/





import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  create(data: CreateProjectDto) {
    return this.prisma.project.create({
      data,
    });
  }

  async update(
    id: number,
    data: UpdateProjectDto,
  ) {
    await this.findOne(id);

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
