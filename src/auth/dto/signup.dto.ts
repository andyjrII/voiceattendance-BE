import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumberString, IsEmail } from 'class-validator';

export class SignupDto {
  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'First Name cannot be empty'})
  firstName: string

  @IsString({message: 'Must be a String'})
  @IsNotEmpty({message: 'Last Name cannot be empty'})
  lastName: string

  @IsNotEmpty({message: 'Email Address cannot be empty'})
  @IsEmail({message: 'Must be an Email Address'})
  email: string;

  @IsString()
  @IsNotEmpty({message: 'password cannot be empty'})
  @MinLength(8, {message: 'Password is too short. Minimal length is 8 characters.'})
  @MaxLength(24, { message: 'Password is too long. Maximal length is 20 characters.'})
  password: string
}