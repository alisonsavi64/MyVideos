import User from "../../../domain/entity/User";
import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import { compare } from "bcrypt";
import UserRepository from "../../../domain/repository/UserRepository";
import LoginUserInput from "./LoginUserInput";
import LoginUserOutput from "./LoginUserOutput";
import AccessToken from "../../../domain/entity/AcessToken";

export default class LoginUser{
    private userRepository: UserRepository;
    constructor(repositoryFactory: RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository();
    }

    async execute (input: LoginUserInput): Promise<LoginUserOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        const isEqual = await compare(input.password, user.password);
        if (!isEqual) throw new Error("Invalid credential");
        const jwtToken = new AccessToken(user);
        return {
            token: jwtToken.token
        }        
    }   
}