import { Gender, Level } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'First Name cannot be empty'})
  firstName: string

  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'Last Name cannot be empty'})
  lastName: string

  @IsNotEmpty({message: 'Matric Number cannot be empty'})
  @IsString({message: 'Must be a String'})
  matricNumber: string;

  @IsNotEmpty({message: 'password cannot be empty'})
  @IsEnum(Level)
  level: Level;

  @IsString({message: 'Must be a String'})
  @Length(9)
  session: string;

  @IsNotEmpty({message: 'Gender must be specified'})
  @IsEnum(Gender)
  gender: Gender;
}