import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class registrationDto {
  @ApiModelProperty()
  @IsString()
  readonly first_name: string;

  @ApiModelProperty()
  @IsString()
  readonly last_name: string;

  @ApiModelProperty()
  @IsString()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;
}
