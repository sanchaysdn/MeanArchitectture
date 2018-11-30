import { Injectable } from '@nestjs/common';
@Injectable()
export class errorService {

    public error(code, message, description) {
        var error: any = {};
        error.code = code;
        error.message = message;
        error.description = description;
        return error;
    }

}