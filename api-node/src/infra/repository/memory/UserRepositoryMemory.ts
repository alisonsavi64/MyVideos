import User from "../../../domain/entity/User";
import UserRepository from "../../../domain/repository/UserRepository";

export default class UserRepositoryMemory implements UserRepository{

    private users: User[]

    constructor(){
        this.users = [new User('user@test.com', '$2b$10$LIFE/KBfzYKOLaZuBiw9Wepb7cXcx0FHQg0Jdr69MA2n40ofvbrgK', 'Teste', 'cff6d26f-f33f-4ea1-9798-dc2f33f7baf6')]
    }
    
    async save(user: User) {
        const emailExists = this.users.find((savedUsers) => savedUsers.email === user.email);
        if (emailExists) throw new Error("User already exists");
        console.log(user);
        this.users.push(user);
        return user;
    }

    async findByEmail(email: string) {
        const user: User | undefined = this.users.find((savedUsers) => savedUsers.email === email);
        if (!user) throw new Error("User does not exists");
        return user;
    }

}