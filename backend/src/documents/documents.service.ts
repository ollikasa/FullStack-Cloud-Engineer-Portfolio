/*import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsService {}
*/



import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.document.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const document = await this.prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException(
        'Document not found',
      );
    }

    return document;
  }

  create(data: CreateDocumentDto) {
    return this.prisma.document.create({
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.document.delete({
      where: { id },
    });
  }
}