import { Level, Semester } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, Length } from 'class-validator';

export class CreateCourseDto {
  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'Course Title cannot be empty'})
  courseTitle: string

  @IsString({message: 'Must be a String'})
  @Length(6)
  courseCode: string

  @IsNotEmpty({message: 'Matric Number cannot be empty'})
  @IsEnum(Semester)
  semester: Semester;

  @IsNotEmpty({message: 'password cannot be empty'})
  @IsEnum(Level)
  level: Level;
}