import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
