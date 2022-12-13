import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { LecturerService } from './lecturer.service';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { Response, Request } from 'express';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('lecturer')
export class LecturerController {
    constructor(private lecturerService: LecturerService) {}

    @Public()
    @Patch('/update')
    @HttpCode(HttpStatus.CREATED)
    async updateLecturer(@Body() dto: UpdateLecturerDto) {
        return await this.lecturerService.updateLecturer(dto)
    }

    @Public()
    @Get('/get')
    @HttpCode(HttpStatus.OK)
    async getLecturer(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const cookies = request.cookies;
        if (!cookies?.id) return response.sendStatus(401);
        const id = cookies.id;
        return await this.lecturerService.getLecturer(id);
    }

    @Get('/count')
    @Public()
    @HttpCode(HttpStatus.OK)
    async getCount() {
        return await this.lecturerService.getCount();
    }

    @Get('/lecturerCount')
    @Public()
    @HttpCode(HttpStatus.OK)
    async getLecturerCourseCount(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const cookies = request.cookies;
        if (!cookies?.id) return response.sendStatus(401);
        const id = cookies.id;
        return await this.lecturerService.getLecturerCount(id);
    }

    @Patch('/course')
    @Public()
    @HttpCode(HttpStatus.OK)
    async updateStudent(@Body() dto: UpdateCourseDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const cookies = request.cookies;
        if (!cookies?.id) return response.sendStatus(401);
        const id = cookies.id;
        return await this.lecturerService.updateCourse(dto, id);
    }
}
