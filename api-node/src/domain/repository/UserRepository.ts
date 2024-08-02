import User from "../entity/User";

export default interface UserRepository {

    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User>;

}
