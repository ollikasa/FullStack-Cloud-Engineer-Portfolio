/*import { Controller } from '@nestjs/common';

@Controller('profile')
export class ProfileController {}*/



/*
import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }
}*/



/*
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, data);
  }
}*/





import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  // PUBLIC
  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  // ADMIN ONLY
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, data);
  }
}