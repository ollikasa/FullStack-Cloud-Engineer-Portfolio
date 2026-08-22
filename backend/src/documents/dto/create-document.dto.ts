import {
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsUrl()
  fileUrl: string;

  @IsString()
  @IsOptional()
  description?: string;
}