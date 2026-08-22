/*import { Controller } from '@nestjs/common';

@Controller('certificates')
export class CertificatesController {}
*/



/*
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly certificatesService: CertificatesService,
  ) {}

  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.certificatesService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateCertificateDto) {
    return this.certificatesService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCertificateDto,
  ) {
    return this.certificatesService.update(id, data);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.certificatesService.remove(id);
  }
}*/





import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly certificatesService: CertificatesService,
  ) {}

  // PUBLIC
  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  // PUBLIC
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.certificatesService.findOne(id);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateCertificateDto) {
    return this.certificatesService.create(data);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCertificateDto,
  ) {
    return this.certificatesService.update(id, data);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.certificatesService.remove(id);
  }
}