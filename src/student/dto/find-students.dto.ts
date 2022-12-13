import { Level } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, Length } from 'class-validator';

export class FindStudentsDto {
  @IsNotEmpty({message: 'password cannot be empty'})
  @IsEnum(Level)
  level: Level;

  @IsString({message: 'Must be a String'})
  @Length(9)
  session: string;
}