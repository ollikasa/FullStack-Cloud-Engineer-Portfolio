import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { EducationModule } from './education/education.module';
import { ProjectsModule } from './projects/projects.module';
import { CertificatesModule } from './certificates/certificates.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProfileModule, EducationModule, ProjectsModule, CertificatesModule, DocumentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
