import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class getUserInfoDto {

  @ApiModelProperty()
  @IsString()
  readonly user_id: string;
}
