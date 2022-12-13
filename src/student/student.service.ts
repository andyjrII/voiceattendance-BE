import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) {}

    async createStudent(dto: CreateStudentDto) {
        const student = await this.prisma.student.create({
            data: { 
                firstName: dto.firstName,
                lastName: dto.lastName,
                matricNumber: dto.matricNumber,
                level: dto.level,
                session: dto.session,
                gender: dto.gender
            }
        })
        return student;        
    }

    async updateStudent(dto: UpdateStudentDto) {
        const students = await this.prisma.student.updateMany({
            where: {
                level: dto.level,
                session: dto.session
            },
            data: {
                level: dto.newLevel
            }
        })
        return students;
    }

    async findStudents(dto: FindStudentsDto) {
        const students = await this.prisma.student.findMany({
            where: {
                level: dto.level,
                session: dto.session
            }
        })
        return students
    }
}
