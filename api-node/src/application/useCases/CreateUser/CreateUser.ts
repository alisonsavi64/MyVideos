import User from "../../../domain/entity/User";
import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import CreateUserInput from "./CreateUserInput";
import { hash } from "bcrypt";
import CreateUserOutput from "./CreateUserOutput";
import UserRepository from "../../../domain/repository/UserRepository";

export default class CreateUser{
    private userRepository: UserRepository;
    constructor(repositoryFactory: RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository();
    }

    async execute (input: CreateUserInput): Promise<CreateUserOutput> {
        const encryptedPassword = await hash(input.password, 10);
        let user = new User(input.email, encryptedPassword, input.nickname);
        user = await this.userRepository.save(user);
        return {
            id: user.id,
            email: user.email
        }        
    }   
}