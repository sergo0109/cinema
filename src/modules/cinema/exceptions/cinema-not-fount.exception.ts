import { NotFoundException } from "@nestjs/common";

export class CinemaNotFountException extends NotFoundException{
    constructor() {
        super('error.cinemaNotFountException');
    }
}
