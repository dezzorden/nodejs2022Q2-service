import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @Length(2)
  @IsNotEmpty()
  password: string;
}
