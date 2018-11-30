import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    userInfoVar: any;

    constructor() {
    }

    setUserInfoVar(val: any) {
        this.userInfoVar = val;
        console.log("this.userInfoVar", this.userInfoVar._id);
    }

    getUserInfoVar() {
        return this.userInfoVar._id;
    }
}