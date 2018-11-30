import { IsString, IsInt, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiModelProperty()
  @IsString()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;
}
