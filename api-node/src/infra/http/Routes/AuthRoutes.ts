import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import AuthController from "../../controller/AuthController";
import Http from "../Http";
import ModelRoutes from "./ModelRoutes";

export default class AuthRoutes implements ModelRoutes {

    private authController: AuthController;    
    constructor(private http: Http, repositoryFactory: RepositoryFactory) {
        this.authController = new AuthController(repositoryFactory);
    }

    init(): void {
        this.http.route("post", "/login", false, async (params: any, body: any) => {
			return await this.authController.loginUser(body);
		});
    }
}
