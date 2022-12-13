import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { LevelCourseDto } from './dto/level-course.dto';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) {}

    async createCourse(dto: CreateCourseDto) {
        const exists = await this.checkCourse(dto.courseCode)
        if (exists) throw new ForbiddenException("Course already exists!") 
        const course = await this.prisma.course.create({
            data: { 
                courseTitle: dto.courseTitle,
                courseCode: dto.courseCode,
                semester: dto.semester,
                level: dto.level
            }
        })
        return course;        
    }

    async levelCourses(dto: LevelCourseDto) {
        const courses = await this.prisma.course.findMany({
            where: {
                level: dto.level
            }
        })
        return courses;
    }

    async checkCourse(courseCode: string) {
        const course = await this.prisma.course.findUnique({
            where: { courseCode }
        })
        return course
    }

    async lecturerCourses(id: string) {
        const courses = await this.prisma.course.findMany({
            where: {
                lecturerId: id
            }
        })
        return courses
    }

    async allCourses() {
        const courses = await this.prisma.course.findMany({
            orderBy: [
                {level: 'desc'},
                {semester: 'asc'},
                {courseCode: 'asc'}
            ],
            include: {
                lecturer: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        return courses
    }

    async lecturerLevelCourses(id: string, dto: LevelCourseDto) {
        const courses = await this.prisma.course.findMany({
            where: {
                lecturerId: id,
                level: dto.level
            },
            orderBy: [
                {semester: 'asc'}
            ],
        })
       
        return courses
    }
}
