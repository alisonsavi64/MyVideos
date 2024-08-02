import IWriteFilesAdapter from "../../domain/adapter/WriteFilesAdapter";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import Http from "./Http";
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";
import VideoRoutes from "./Routes/VideoRoutes";

export default class Router {

	private userRoutes: UserRoutes;
	private authRoutes: AuthRoutes;
	private videoRoutes: VideoRoutes;
	constructor (private http: Http, private repositoryFactory: RepositoryFactory) {
        this.userRoutes = new UserRoutes(http, repositoryFactory);
        this.authRoutes = new AuthRoutes(http, repositoryFactory);
        this.videoRoutes = new VideoRoutes(http, repositoryFactory);
	}

	init () {
		this.userRoutes.init();
		this.authRoutes.init();
		this.videoRoutes.init();
		this.http.route("get", "/", true, async (params: any, body: any) => {
			return {
				message: "welcome"
			}
		});
	}
}
