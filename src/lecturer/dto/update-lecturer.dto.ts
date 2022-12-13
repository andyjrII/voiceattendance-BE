import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateLecturerDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty({message: 'password cannot be empty'})
  @MinLength(8, {message: 'Password is too short. Minimal length is 8 characters.'})
  @MaxLength(24, { message: 'Password is too long. Maximal length is 20 characters.'})
  newPassword: string;
}