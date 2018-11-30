//Module
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
//Common Services File
import { errorService } from './../lib/error';
import { commonQueryService } from './../lib/commonQuery';
import { constantService } from './../lib/constants';
import { SharedService } from './shared.service';

//Interface
import { userInterface } from './../Interface/user_interface';

@Injectable()
export class registrationService {
    constructor(
        @InjectModel('userData') private readonly userModel: Model<userInterface>,
        public jwtService: JwtService,
        public ErrorRes: errorService,
        public commonQuery: commonQueryService,
        public ConstantRes: constantService,
        private userInfoService: SharedService


    ) { }


    /**
    * Function is to Registor User for Web
    * @access private
    * @return json
    * Created by 'dev name'
    * @smartData Enterprises (I) Ltd
    * Created Date 03-Oct-2018
    */

    async registerUser(req_data) {
        try {
            if (req_data.email == '' || req_data.password == '') {
                return {
                    code: 401,
                    responseData: {

                        "status": this.ConstantRes.statusCode.error,
                        message: this.ConstantRes.validateMsg.mandatory,
                        result: null
                    }
                };
            } else {
                var cond = {
                    email: req_data.email
                },
                    fetc = {
                        _id: 1
                    },
                    checkUser = await this.commonQuery.findoneData(this.userModel, cond, fetc);
                if (checkUser) {
                    return {
                        code: 404,
                        responseData: {
                            "status": 0,
                            message: this.ConstantRes.validateMsg.emailAlreadyExist,
                            result: null
                        }
                    };
                } else {
                    var obj = {
                        email: req_data.email,
                        password: req_data.password,
                        first_name: req_data.first_name,
                        last_name: req_data.last_name
                    };
                    var addUser = await this.commonQuery.InsertIntoCollection(this.userModel, obj);
                    if (addUser) {
                        return {
                            code: 200,
                            responseData: {
                                "status": 1,
                                message: this.ConstantRes.messages.RegistrationSuccessfully,
                                result: addUser
                            }
                        }

                    } else {
                        return {
                            code: 404,
                            responseData: {
                                "status": 0,
                                message: this.ConstantRes.messages.RegistrationFailed,
                                result: null
                            }
                        }
                    }


                }
            }
        } catch (err) {
            return this.ErrorRes.error(
                this.ConstantRes.statusCode.error,
                this.ConstantRes.messages.requestNotProcessed,
                err
            )
        }
    }

    /**
      * Function is to Login User for Web
      * @access private
      * @return json
      * Created by 'dev name'
      * @smartData Enterprises (I) Ltd
      * Created Date 03-Oct-2018
      */

    async loginUser(data) {
        // this.userModel.find({}).exec(function (err, data) {
        //     console.log('data',data);
        // })
        try {
            if (!data.email || !data.password) {
                return {
                    code: 401,
                    responseData: {
                        "status": this.ConstantRes.statusCode.error,
                        message: this.ConstantRes.validateMsg.mandatory,
                        result: {}
                    }
                };
            } else {
                let userData = {
                    email: data.email.toLowerCase(),
                    password: data.password,
                },
                fetc = {
                    _id: 1,
                    email: 1,
                    password: 1,
                    first_name:1,
                    last_name:1
                };
                let getuser = await this.commonQuery.findoneData(this.userModel, userData, fetc);
                if (getuser) {
                    this.userInfoService.setUserInfoVar(getuser);
                    var Responseobj = {
                        logindata: getuser
                    }
                   const user  = { _id: getuser._id };
                    const accessToken = this.jwtService.sign(user);
                    if (Responseobj) {
                        return {
                            code: 200,
                            responseData: {
                                "status": 1,
                                message: "Login Successful",
                                result: Responseobj,
                                accessToken:accessToken
                            }
                        };
                    }
                } else {
                    return {

                        code: 404,
                        responseData: {
                            "status": 0,
                            message: "Login Failed User not Present",
                            result: ''
                        }
                    }

                }
            }
        } catch (err) {
            return this.ErrorRes.error(
                this.ConstantRes.statusCode.error,
                this.ConstantRes.messages.requestNotProcessed,
                err
            )
        }
    }

    /**
    * Function is to get User Info for Web
    * @access private
    * @return json
    * Created by 'dev name'
    * @smartData Enterprises (I) Ltd
    * Created Date 10-Oct-2018
    */
    async getUserInfo(data) {
        try {
            if (!data.user_id) {
                return {
                    code: 401,
                    responseData: {
                        "status": this.ConstantRes.statusCode.error,
                        message: this.ConstantRes.validateMsg.mandatory,
                        result: null
                    }
                };
            } else {
                let userData = {
                    _id: data.user_id,
                },
                fetc = {
                    _id: 1,
                    email: 1,
                    password: 1,
                    first_name:1,
                    last_name:1
                };
                let getuser = await this.commonQuery.findoneData(this.userModel, userData, fetc);
                if (getuser) {
                    this.userInfoService.setUserInfoVar(getuser);
                    return {
                        code: 200,
                        responseData: {
                            "status": 1,
                            message: "Get user data Successfull",
                            result: getuser
                        }
                    };

                } else {
                    return {
                        code: 404,
                        responseData: {
                            "status": 0,
                            message: "User data not Present",
                            result: ''
                        }
                    }

                }
            }
        } catch (err) {
            return this.ErrorRes.error(
                this.ConstantRes.statusCode.error,
                this.ConstantRes.messages.requestNotProcessed,
                err
            )
        }
    }

    /**
       * Function is to get User Info for Web
       * @access private
       * @return json
       * Created by 'dev name'
       * @smartData Enterprises (I) Ltd
       * Created Date 05-Nov-2018
       */


    async updateUserInfo(req_data) {
        try {
            if (!req_data.user_id) {
                return this.ErrorRes.error(
                    this.ConstantRes.statusCode.error,
                    this.ConstantRes.messages.requestNotProcessed,
                    null
                )
            } else {
                let Condition = {
                    _id: req_data.user_id
                };
                let obj={
                    first_name:req_data.first_name,
                    last_name:req_data.last_name
                }
                var updateuser = await this.commonQuery.updateAllDocument(this.userModel, Condition, obj)
                if (!updateuser) {
                    return {
                        code: 401,
                        responseData: {
                            "status": 0,
                            message: "User Profile update failed",
                            result: ''
                        }
                    }
                } else {
                    return {
                        code: 200,
                        responseData: {
                            "status": 1,
                            message: "User Profile Updated Successfully",
                            result: updateuser
                        }
                    };
                }
            }
        } catch (err) {
            return this.ErrorRes.error(
                this.ConstantRes.statusCode.error,
                this.ConstantRes.messages.requestNotProcessed,
                err
            )
        }

    }
}




