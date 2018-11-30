'use strict';

/*
 * commonQuery - commnQuery.ts
 * Author: smartData Enterprises
 * Date: 22 Jan 2018
 * Explanation:All queries of mongoDB
 */

import * as fs from 'fs';
import * as path from 'path';

//Module
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

//Interface
import { userInterface } from './../Interface/user_interface';

import { async } from 'rxjs/internal/scheduler/async';


@Injectable()

export class commonQueryService {
    constructor(
        @InjectModel('userData') private readonly userModel: Model<userInterface>,
    ) { }

    /**
     * Function is use to Fetch Single data
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public findoneData(model, cond, fetchVal) {
        return new Promise(function (resolve, reject) {
            model.findOne(cond, fetchVal, function (err, userData) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userData);
                }

            });
        })
    }


    /**
     * Function is use to Last Inserted id
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public lastInsertedId(model) {
        return new Promise(async function (resolve, reject) {
            let id
            await model.findOne().sort({ id: -1 }).limit(1).exec(function (err, data) {
                if (err) {
                    resolve(0);
                } else {
                    if (data) {
                        //console.log("console 1----->", data);
                        id = data.id + 1;
                        //console.log("console 2--->", id);
                    } else {
                        id = 1;
                    }
                }
                resolve(id);
            });
        })
    }

    /**
     * Function is use to Insert object into Collections
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public InsertIntoCollection(model, obj) {
        return new Promise(function (resolve, reject) {
            new model(obj).save(function (err, userInfo) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userInfo);
                }
            });
        })
    }
    /**
     * Function is use to upload file into specific location
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public fileUpload(imagePath, buffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(imagePath), buffer, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve('uploaded');
                }
            });
        });
    }
    

    /**
     * Function is use to delete file from specific directory
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public deleteFile(filePath) {
        return new Promise(function (resolve, reject) {
            fs.unlink(filePath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Success fully Deleted ");
                    resolve("success");
                }
            });
        })
    }

    /**
     * Function is use to Update One Document
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public updateOneDocument(model, updateCond, userUpdateData) {
        return new Promise(function (resolve, reject) {
            model.findOneAndUpdate(updateCond, {
                $set: userUpdateData
            }, {
                    new: true
                })
                .lean().exec(function (err, userInfoData) {
                    if (err) {
                        resolve(0);
                    } else {
                        resolve(userInfoData);
                    }
                });
        })
    }

    /**
     * Function is use to Update All Document
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public updateAllDocument(model, updateCond, userUpdateData) {
        return new Promise(function (resolve, reject) {
            model.update(updateCond, {
                $set: userUpdateData
            }, {
                    multi: true
                })
                .lean().exec(function (err, userInfoData) {
                    if (err) {
                        resolve(0);
                    } else {
                        resolve(userInfoData);
                    }
                });
        })
    }

    /**
     * Function is use to Find all Documents
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public fetch_all(model, cond, fetchd) {
        return new Promise(function (resolve, reject) {
            model.find(cond, fetchd).exec(function (err, userData) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userData);
                }

            });
        })
    }

    /**
     * Function is use to Count number of record from a collection
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public countData(model, cond) {
        return new Promise(function (resolve, reject) {
            model.count(cond).exec(function (err, userData) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userData);
                }

            });
        })
    }
    /**
     * Function is use to Fetch All data from collection , Also it supports aggregate function
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public fetchAllLimit(query) {


        return new Promise(function (resolve, reject) {
            query.exec(function (err, userData) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
        })
    }

    /**
     * Function is use to Insert object into Collections , Duplication restricted
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public uniqueInsertIntoCollection(model, obj) {
        return new Promise(function (resolve, reject) {
            new model(obj).save(function (err, userInfo) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(userInfo);
                }
            });
        })
    }

    /**
     * Function is use to DeleteOne Query
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public deleteOneDocument(model, cond) {
        return new Promise(function (resolve, reject) {
            model.deleteOne(cond).exec(function (err, userData) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(1);
                }

            });
        })
    }
    /**
     * Function is use to Insert Many object into Collections
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public InsertManyIntoCollection(model, obj) {
        return new Promise(function (resolve, reject) {
            model.insertMany(obj, function (error, inserted) {
                if (error) {
                    resolve(0);
                } else {
                    resolve(1);
                }

            });
        })
    }

    /**
     * Function is use to delete Many document from Collection
     * @access private
     * @return json
     * Created by 'dev name'
     * @smartData Enterprises (I) Ltd
     * Created Date 28-Aug-2018
     */
    public deleteManyfromCollection(model, obj) {
        return new Promise(function (resolve, reject) {
            model.deleteMany(obj, function (error, inserted) {
                if (error) {
                    resolve(0);
                } else {
                    resolve(1);
                }

            });
        })
    }
}

