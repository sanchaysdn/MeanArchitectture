import { Controller,UseGuards, Get, Post, Body, FileInterceptor, UploadedFile, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { blogService } from './../Services/blog.service';
import { addBlogDto } from './../Dto/add_blog';
import { getBlogDto } from './../Dto/get_blog';
import { AuthGuard } from '../Gaurds/auth.gaurds';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'


@ApiUseTags('blog_ctrl')
@ApiBearerAuth()
@Controller('blog_ctrl')
@UseGuards(AuthGuard)
export class BlogController {
    constructor(private readonly blogService: blogService) { }
  
    //method post
    // function is used  to add blog
    @Post('addBlog')    
    async addBlog(@Body() addBlogDto: addBlogDto) {
        return this.blogService.addBlog(addBlogDto);
    }

    //method post
    // function is used  to getblog by id 
    @Post('getBlog')
    async getBlog(@Body() getBlogDto: getBlogDto) {
        return this.blogService.getBlog(getBlogDto);
    }
}