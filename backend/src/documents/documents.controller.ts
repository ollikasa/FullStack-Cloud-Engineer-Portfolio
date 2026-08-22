/*import { Controller } from '@nestjs/common';

@Controller('documents')
export class DocumentsController {}*/


/*
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
  ) {}

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentsService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateDocumentDto) {
    return this.documentsService.create(data);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentsService.remove(id);
  }
}*/




import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
  ) {}

  // PUBLIC
  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  // PUBLIC
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentsService.findOne(id);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateDocumentDto) {
    return this.documentsService.create(data);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentsService.remove(id);
  }
}
