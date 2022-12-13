import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) {}

    async takeAttendance(dto: MarkAttendanceDto) {
        const course = await this.prisma.course.findUnique({
            where: {
                courseCode: dto.courseCode
            }
        })
        
        const student = await this.prisma.student.findUnique({
            where: {
                matricNumber: dto.matricNumber
            }
        })

        const isExisting = await this.prisma.attendance.findFirst({
            where: {
                courseId: course.id,
                studentId: student.id,
                dayMarked: new Date(dto.dayMarked)
            }
        })

        if(isExisting) {
            const attendance = await this.prisma.attendance.update({
                where: {
                    id: isExisting.id
                },
                data: { 
                    session: dto.session,
                    courseId: course.id,
                    studentId: student.id,
                    attendanceStatus: dto.attendanceStatus
                }
            })
            return attendance
        } else {
            const attendance = await this.prisma.attendance.create({
                data: { 
                    session: dto.session,
                    courseId: course.id,
                    studentId: student.id,
                    attendanceStatus: dto.attendanceStatus
                }
            })
            return attendance;
        }      
    }
}
