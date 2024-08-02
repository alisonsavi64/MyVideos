import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import VideoController from "../../controller/VideoControler";
import Http from "../Http";
import ModelRoutes from "./ModelRoutes";

export default class VideoRoutes implements ModelRoutes {

    private videoController: VideoController;    
    constructor(private http: Http, repositoryFactory: RepositoryFactory) {
        this.videoController = new VideoController(repositoryFactory);
    }

    init(): void {
        this.http.route("post", "/publish", true, async (params: any, body: any) => {
			return await this.videoController.createVideo(body);
		});
    }
}
