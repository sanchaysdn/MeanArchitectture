//Module
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

//Common Services File
import { errorService } from './../lib/error';
import { commonQueryService } from './../lib/commonQuery';
import { constantService } from './../lib/constants';
import { SharedService } from './shared.service';

//Interface
import { blogInterface } from './../Interface/blog_interface';

@Injectable()
export class blogService {
    constructor(
        @InjectModel('blog') private readonly blogModel: Model<blogInterface>,
        public ErrorRes: errorService,
        public commonQuery: commonQueryService,
        public ConstantRes: constantService,
    ) { }


    /**
    * Function is to Registor User for Web
    * @access private
    * @return json
    * Created by 'dev name'
    * @smartData Enterprises (I) Ltd
    * Created Date 03-Oct-2018
    */

    async addBlog(req) {
        try {
            if (req.blog_title == '' || req.blog_desc == '' || req.created_by == '') {
                return {
                    code: 401,
                    responseData: {

                        "status": this.ConstantRes.statusCode.error,
                        message: this.ConstantRes.validateMsg.mandatory,
                        result: null
                    }
                };
            } else {
                var obj = {
                    blog_title: req.blog_title,
                    blog_desc: req.blog_desc,
                    created_by: req.created_by
                };
                var blog = await this.commonQuery.InsertIntoCollection(this.blogModel, obj);
                if (blog) {
                    return {
                        code: 200,
                        responseData: {
                            "status": 1,
                            message: this.ConstantRes.messages.RegistrationSuccessfully,
                            result: blog
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
    async getBlog(req) {
        try {
            if (!req.blog_id) {
                return {
                    code: 401,
                    responseData: {
                        "status": this.ConstantRes.statusCode.error,
                        message: this.ConstantRes.validateMsg.mandatory,
                        result: null
                    }
                };
            } else {
                let blogCond = {
                    _id: req.blog_id,
                },
                project = {
                    _id: 1,
                    blog_title: 1,
                    blog_desc: 1,

                };
                //lookup example 
                // let lookupresult= await this.blogModel.aggregate([
                //     { 
                //         $match: {_id:mongoose.Types.ObjectId(req.blog_id)}
                //     },
                //     { 
                //         $lookup: { 
                //             from: 'userdatas', 
                //             localField: 'created_by', 
                //             foreignField: '_id', 
                //             as: 'user' 
                //         } 
                //     },
                //     {
                //         $unwind:'$user'
                //     },
                //     {
                //         $project:{
                //             _id: 1,
                //             blog_title: 1,
                //             blog_desc: 1,
                //             user:1
                //         }
                //     }
                // ]).exec();
                // console.log('lookupresult',lookupresult);
                let getBlog = await this.blogModel.find(blogCond, project).populate('created_by').exec();
                if (getBlog) {
                    return {
                        code: 200,
                        responseData: {
                            "status": 1,
                            message: "Get blog data Successfull",
                            result: getBlog
                        }
                    };

                } else {
                    return {
                        code: 404,
                        responseData: {
                            "status": 0,
                            message: "Blog data not Found",
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
}




