import { IsString, Length } from 'class-validator';

export class UpdateCourseDto {
  @IsString({message: 'Must be a String'})
  @Length(6)
  courseCode: string
}