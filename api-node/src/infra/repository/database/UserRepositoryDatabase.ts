import User from "../../../domain/entity/User";
import UserRepository from "../../../domain/repository/UserRepository";
import Connection from "../../database/Connection";

export default class UserRepositoryDatabase implements UserRepository{

    constructor(private connection: Connection){
    }
    
    async save(user: User) {
        const emailExists = await this.connection.execute("select 1 from users where email = $1", [user.email]);
        if (emailExists.length) throw new Error("This e-mail is already associated with an existing account");
        await this.connection.execute("insert into users (email, password, id, nickname) values ($1, $2, $3, $4)", [user.email, user.password, user.id, user.nickname]);
        return await this.findById(user.id);
    }

    async findByEmail(email: string): Promise<User> {
        const [ userData ] = await this.connection.execute("select id, email, password, nickname from users where email = $1 and id is not null", [email]);
        if (!userData) throw new Error("User not found");
        return new User(userData.email, userData.password, userData.nickname, userData.id);
    }

    async findById(userId: string | undefined): Promise<User> {
        const [ userData ] = await this.connection.execute("select id, email, password from users where id = $1", [userId]);
        if (!userData) throw new Error("User not found");
        return new User(userData.email, userData.password, userData.nickname, userData.id);
    }

}