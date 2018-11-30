import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class updateUserInfoDto {

  @ApiModelProperty()
  @IsString()
  readonly first_name: string;

  @ApiModelProperty()
  @IsString()
  readonly last_name: string;

  @ApiModelProperty()
  @IsString()
  readonly user_id: string;
  
}
