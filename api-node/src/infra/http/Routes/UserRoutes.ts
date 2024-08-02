import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import UserController from "../../controller/UserController";
import Http from "../Http";
import ModelRoutes from "./ModelRoutes";

export default class UserRoutes implements ModelRoutes {

    private userController: UserController;    
    constructor(private http: Http, repositoryFactory: RepositoryFactory) {
        this.userController = new UserController(repositoryFactory);
    }

    init(): void {
        this.http.route("post", "/users", true, async (params: any, body: any) => {
			return await this.userController.createUser(body);
		});
    }
}
