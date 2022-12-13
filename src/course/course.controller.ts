import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { LevelCourseDto } from './dto/level-course.dto';
import { Response, Request } from 'express';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}
    
    @Post('/create')
    @Public()
    @HttpCode(HttpStatus.OK)
    async createStudent(@Body() dto: CreateCourseDto) {
        return await this.courseService.createCourse(dto)
    }

    @Post('/levelCourses')
    @Public()
    @HttpCode(HttpStatus.OK)
    async levelCourses(@Body() dto: LevelCourseDto) {
        return await this.courseService.levelCourses(dto)
    }

    @Get('/lecturerCourses')
    @Public()
    @HttpCode(HttpStatus.OK)
    async lecturerCourses(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const cookies = request.cookies;
        if (!cookies?.id) return response.sendStatus(401);
        const id = cookies.id;
        return await this.courseService.lecturerCourses(id);
    }

    @Post('/lecturerLevelCourses')
    @Public()
    @HttpCode(HttpStatus.OK)
    async lecturerLevelCourses(@Body() dto: LevelCourseDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const cookies = request.cookies;
        if (!cookies?.id) return response.sendStatus(401);
        const id = cookies.id;
        return await this.courseService.lecturerLevelCourses(id, dto);
    }

    @Get('/all')
    @Public()
    @HttpCode(HttpStatus.OK)
    async allCourses() {
        return await this.courseService.allCourses();
    }
}
