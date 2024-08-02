import { verify } from "jsonwebtoken";
import Auth from "./Auth";
import { readFileSync } from "fs";

export default class ExpressAuth implements Auth {


    constructor() {
    }
    
    async execute(request: any, response: any, next: any): Promise<any> {
        if (!request.headers || !request.headers['access-token']) {
            return response.status(403).json({
                message: 'Token is required'
            });
        }
        const token = request.headers['access-token'];
        try {
            const publicKey = readFileSync('./public.pem', 'utf8');
            let data;
            try {
                data = verify(token, publicKey, { algorithms: ["RS256"] }); // @ts-ignore
            } catch (e) {
                throw new Error('Invalid token');
            }
            request.body.session = data;
            return next();
        } catch (e) {
            return response.status(401).json({ // @ts-ignore
                error: e.errorCode,
                message: (e as Error).message
            });
        }
    }

}
