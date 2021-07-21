import { NotFoundException } from "@nestjs/common";

export class SessionNotFoundException extends NotFoundException{
    constructor() {
        super('error.sessionNotFoundException');
    }
}
