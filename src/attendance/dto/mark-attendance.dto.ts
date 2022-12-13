import { AttendanceStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class MarkAttendanceDto {
  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'First Name cannot be empty'})
  courseCode: string

  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'Last Name cannot be empty'})
  matricNumber: string

  @IsString({message: 'Must be a String'})
  @IsEnum(AttendanceStatus)
  attendanceStatus: AttendanceStatus

  @IsString({message: 'Must be a String'})
  @Length(9)
  session: string;

  @IsNotEmpty()
  dayMarked: Date;
}