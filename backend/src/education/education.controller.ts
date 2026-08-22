/*import { Controller } from '@nestjs/common';

@Controller('education')
export class EducationController {}
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

import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('education')
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
  ) {}

  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.educationService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateEducationDto) {
    return this.educationService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEducationDto,
  ) {
    return this.educationService.update(id, data);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.educationService.remove(id);
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

import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('education')
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
  ) {}

  // PUBLIC
  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  // PUBLIC
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.educationService.findOne(id);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateEducationDto) {
    return this.educationService.create(data);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEducationDto,
  ) {
    return this.educationService.update(id, data);
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.educationService.remove(id);
  }
}