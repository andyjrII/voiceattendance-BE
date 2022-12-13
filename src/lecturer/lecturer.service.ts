import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';

@Injectable()
export class LecturerService {
    constructor(private prisma: PrismaService) {}
    
    async updateLecturer(dto: UpdateLecturerDto) {
        const lecturer = await this.prisma.lecturer.findUnique({
            where: { id: dto.id }
        })

        if(lecturer.password !== dto.oldPassword) throw new ForbiddenException(`Invalid pin`)

        await this.prisma.lecturer.update({
            where: { id: dto.id },
            data: { password: dto.oldPassword }
        })

        return `Password Successfully changed!`
    }

    async getLecturer(id: string) {
        const lecturer = await this.prisma.lecturer.findUnique({
            where: { id },
            include: {courses: true}
        })

        return lecturer
    }

    async getCount() {
        const lecturerCount = await this.prisma.lecturer.count();
        const studentCount = await this.prisma.student.count();
        const courseCount = await this.prisma.course.count();
        return {lecturerCount, studentCount, courseCount}; 
    }

    async getLecturerCount(id: string) {
        const courseCount = await this.prisma.course.count({
            where: {lecturerId: id}
        })
    }

    async updateCourse(dto: UpdateCourseDto, id: string) {
        const course = await this.prisma.course.update({
            where: {
               courseCode: dto.courseCode 
            },
            data: {
                lecturerId: id
            }
        })

        return course
    }
}
