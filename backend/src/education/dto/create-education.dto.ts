import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEducationDto {
  @IsString()
  institution: string;

  @IsString()
  degree: string;

  @IsString()
  field: string;

  @IsInt()
  @IsOptional()
  startYear?: number;

  @IsInt()
  @IsOptional()
  endYear?: number;

  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  description?: string;
}