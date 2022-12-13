import { Level } from '@prisma/client';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNotEmpty()
  @IsEnum(Level)
  newLevel: Level;

  @IsNotEmpty()
  @IsString()
  session: string;
}