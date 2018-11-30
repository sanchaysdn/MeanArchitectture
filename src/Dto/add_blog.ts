import { IsString, IsInt, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class addBlogDto {
  @ApiModelProperty()
  @IsString()
  readonly blog_title: string;

  @ApiModelProperty()
  @IsString()
  readonly blog_desc: string;

  @ApiModelProperty()
  @IsString()
  readonly created_by: string;
}

