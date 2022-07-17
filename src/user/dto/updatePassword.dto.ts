import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @Length(2)
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @Length(2)
  @IsNotEmpty()
  newPassword: string;
}
