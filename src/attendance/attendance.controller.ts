import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}
    
    @Post('/take')
    @Public()
    @HttpCode(HttpStatus.OK)
    async takeAttendance(@Body() dto: MarkAttendanceDto) {
        return await this.attendanceService.takeAttendance(dto)
    }

}
