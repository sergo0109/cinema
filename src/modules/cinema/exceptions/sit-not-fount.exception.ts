import { NotFoundException } from "@nestjs/common";

export class SitNotFountException extends NotFoundException{
    constructor() {
        super('error.sitNotFountException');
    }
}
