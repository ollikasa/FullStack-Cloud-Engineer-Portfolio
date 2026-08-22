import {
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  title: string;

  @IsString()
  issuer: string;

  @IsString()
  @IsOptional()
  issueDate?: string;

  @IsUrl()
  @IsOptional()
  credentialUrl?: string;

  @IsUrl()
  @IsOptional()
  fileUrl?: string;
}