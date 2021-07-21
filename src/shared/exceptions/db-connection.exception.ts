import { HttpException } from "@nestjs/common";

export class DbConnectionException extends HttpException{
    constructor(err) {
        super('error.dbConnection'+err.message, err.status);
    }
}
