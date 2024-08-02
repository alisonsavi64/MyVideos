import { v4 as uuidv4 } from "uuid";

export default class User{
    constructor(readonly email: string, private $password: string, private $nickname: string, readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
    }

    get password(): string {
        return this.$password;
    }

    set password(value: string) {
        this.$password = value;
    }

    get nickname(): string {
        return this.$nickname;
    }

    set nickname(value: string) {
        this.$nickname = value;
    }
}