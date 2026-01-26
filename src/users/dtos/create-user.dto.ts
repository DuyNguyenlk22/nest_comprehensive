/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString({ message: 'Name should be a string value.' })
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name should have a minimum length of 3 characters.',
  })
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsBoolean()
  isMarried: boolean;
}
