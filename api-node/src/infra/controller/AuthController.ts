import LoginUser from "../../application/useCases/LoginUser/LoginUser";
import LoginUserInput from "../../application/useCases/LoginUser/LoginUserInput";
import LoginUserOutput from "../../application/useCases/LoginUser/LoginUserOutput";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import validateInputControllers from "./helper/validateInputControllers";

export default class AuthController {

    private repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory: RepositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async loginUser(input: LoginUserInput): Promise<LoginUserOutput> {
        validateInputControllers(input, {
            email: "string",
            password: "string",
        });
        const loginUser = new LoginUser(this.repositoryFactory);
        return await loginUser.execute(input);
    }

}
