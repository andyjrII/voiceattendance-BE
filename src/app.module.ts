import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './common/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { AttendanceModule } from './attendance/attendance.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    AuthModule, LecturerModule, PrismaModule, StudentModule, AttendanceModule, CourseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ]
})

export class AppModule {}
