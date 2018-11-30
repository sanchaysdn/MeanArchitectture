
import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { userInterface } from '../Interface/user_interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectModel('userData') private readonly userModel: Model<userInterface>,
        public jwtService: JwtService

    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request.headers.authorization) {
            var data = this.jwtService.decode(request.headers.authorization, {});
            // this.userModel.find({}).exec(function(err,data){
            //     console.log('data',data);
            // })
            if (data) {
                return true
            } else {
                throw new HttpException({
                    status: 'false',
                    error: 'Unauthorized User',
                }, 403);
            }
        } else {
            throw new HttpException({
                status: 'false',
                error: 'Unauthorized User',
            }, 403);
            //return false
        }

    }
}