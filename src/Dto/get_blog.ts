import { IsString, IsInt, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class getBlogDto {

  @ApiModelProperty()
  @IsString()
  readonly blog_id: string;

}

