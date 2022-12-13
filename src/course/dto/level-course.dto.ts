import { Level } from '@prisma/client';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class LevelCourseDto {
  @IsNotEmpty({message: 'password cannot be empty'})
  @IsEnum(Level)
  level: Level;
}