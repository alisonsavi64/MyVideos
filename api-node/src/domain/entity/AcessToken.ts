import { readFileSync } from "fs";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "./User";

export default class AccessToken {

    readonly id: string;
    readonly token: string;

    constructor(user: User, id?: string, token?: string) {
        if (!id) id = uuidv4();
        this.id = id;
        if (token) {
            this.token = token;
            return;
        }
        const privateKey = readFileSync('./private.pem', 'utf8');
        const payload = {
            userId: user.id,
            userEmail: user.email,
            id: this.id
        }
        this.token = sign(payload, privateKey, {
            expiresIn: "10d",
            algorithm: 'RS256'
        });
    }

}
