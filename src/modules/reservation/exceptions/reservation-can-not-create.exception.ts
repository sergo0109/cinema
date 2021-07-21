import { HttpException } from "@nestjs/common";

export class ReservationCanNotCreateException extends HttpException{
    constructor(err) {
        super('error.ReservationCanNotCreate ' + err.message, err.status);
    }
}
