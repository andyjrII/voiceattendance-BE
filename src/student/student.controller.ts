import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {}
    
    @Post('/create')
    @Public()
    @HttpCode(HttpStatus.OK)
    async createStudent(@Body() dto: CreateStudentDto) {
        return await this.studentService.createStudent(dto)
    }

    @Patch('/update')
    @Public()
    @HttpCode(HttpStatus.OK)
    async updateStudent(@Body() dto: UpdateStudentDto) {
        return await this.studentService.updateStudent(dto)
    }

    @Post('/find')
    @Public()
    @HttpCode(HttpStatus.OK)
    async findStudents(@Body() dto: FindStudentsDto) {
        return await this.studentService.findStudents(dto)
    }
}
