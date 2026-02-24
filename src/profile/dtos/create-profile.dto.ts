import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString({ message: 'First Name must be a string.' })
  @MinLength(3, {
    message: 'First Name should have a minimum length of 3 characters.',
  })
  @MaxLength(100)
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last Name must be a string.' })
  @MinLength(3, {
    message: 'Last Name should have a minimum length of 3 characters.',
  })
  @MaxLength(100)
  lastName?: string;

  @IsOptional()
  @IsString({ message: 'Gender must be a string.' })
  @MaxLength(10)
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
