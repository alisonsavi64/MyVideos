import CreateUser from "../../application/useCases/CreateUser/CreateUser";
import CreateUserInput from "../../application/useCases/CreateUser/CreateUserInput";
import CreateUserOutput from "../../application/useCases/CreateUser/CreateUserOutput";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import validateInputControllers from "./helper/validateInputControllers";

export default class UserController {

    private repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory: RepositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
        validateInputControllers(input, {
            email: "string",
            password: "string",
            nickname: "string",
        });
        const createUser = new CreateUser(this.repositoryFactory);
        return await createUser.execute(input);
    }

}
