
import { Injectable } from '@nestjs/common';
@Injectable()
export class constantService {


    public statusCode = {
        "ok": 200,
        "error": 401,
        "warning": 404,
        "failed": 1002,
        "unauth": 402,
        "internalError": 1004,
        "failedConnection": 500,
        "okList": 201
    }

    public messages = {
        "requestNotProcessed": "Request could not be processed. Please try again",
        "getSd3File": "Sd3 File data fetched Successfully",
        "sd3Upload": "Sd3 Document Uploaded Successfully",
        "RegistrationSuccessfully": "User Registration Successfully",
        "RegistrationFailed": "User Registration Failed"

    }
    public validateMsg = {
        "emailAlreadyExist": "Email Id already exist, try with another",
        "mcu_idAlreadyExist": "Mcu_id already exist, try with another",
        "invalidEmail": "Invalid Email Given",
        "mandatory": "Please provide all Mandatory field.",
    }


}