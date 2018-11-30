import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

//controller
import { RegistrationController } from './Controllers/registration_ctrl';
import { BlogController } from './Controllers/blog_ctrl';
//Services

import { errorService } from './lib/error';
import { constantService } from './lib/constants';
import { commonQueryService } from './lib/commonQuery';
import { registrationService } from './Services/registrationFile.service';
import { blogService } from './Services/blog.service';
import { SharedService } from './Services/shared.service';

//Import Schema
import { userSchema } from './Modal/user_schema';
import { blogSchema } from './Modal/blog_schema';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/demo-nestjs'),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/swimapp', {
    //   user: 'swimapp',
    //   pass: 'Swim2App9851'
    // }),
    MongooseModule.forFeature([
      { name: 'userData', schema: userSchema },
      { name: 'blog', schema: blogSchema },
    ])],
    
    controllers: [RegistrationController,BlogController],
    providers: [
      errorService,
      constantService,
      commonQueryService,
      registrationService,
      blogService,
      SharedService
    ],
})

export class AppModule { }
