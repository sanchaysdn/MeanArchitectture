import { Controller, Get, Post, Body, FileInterceptor, UploadedFile, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { registrationService } from './../Services/registrationFile.service';
import { registrationDto } from './../Dto/registration_dto';
import { loginDto } from './../Dto/login_dto';
import { getUserInfoDto } from './../Dto/get_user_Info';
import { updateUserInfoDto } from './../Dto/update_user_Info';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'

@ApiUseTags('registration_ctrl')
@Controller('registration_ctrl')
export class RegistrationController {
    constructor(private readonly registrationService: registrationService) { }
  
    //method post
    // function is used  to register user
    @Post('registerUser')
    async registerUser(@Body() registrationDto: registrationDto) {
        return this.registrationService.registerUser(registrationDto);
    }

    //method post
    // function is used  to login  user
    @Post('loginUser')
    async loginUser(@Body() loginDto: loginDto) {
        return this.registrationService.loginUser(loginDto);
    }

    //method post
    // function is used to get user info
    @Post('getUserInfo')
    async getUserInfo(@Body() getUserInfoDto: getUserInfoDto) {
        return this.registrationService.getUserInfo(getUserInfoDto);
    }

    //method post
    // function is used to update user info 
    @Post('updateUserInfo')
    async updateUserInfo(@Body() updateUserInfoDto: updateUserInfoDto) {
        return this.registrationService.updateUserInfo(updateUserInfoDto);
    }

}