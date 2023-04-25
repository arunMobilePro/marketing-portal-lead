import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsAlpha,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'firstName',
    description: 'firstName',
    required: true,
  })
  @IsAlpha()
  readonly firstName: String;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'lastName',
    description: 'lastName',
    required: true,
  })
  @IsAlpha()
  readonly lastName: String;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'email',
    description: 'email',
    required: true,
  })
  @IsAlpha()
  readonly email: String;

}