import CreateVideo from "../../application/useCases/CreateVideo/CreateVideo";
import CreateVideoInput from "../../application/useCases/CreateVideo/CreateVideoInput";
import CreateVideoOutput from "../../application/useCases/CreateVideo/CreateVideoOutput";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import validateInputControllers from "./helper/validateInputControllers";

export default class VideoController {

    private repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory: RepositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async createVideo(input: CreateVideoInput): Promise<CreateVideoOutput> {
        validateInputControllers(input, {
            title: "string",
            category: "string",
            media: "Buffer",
        });
        const createVideo = new CreateVideo(this.repositoryFactory);
        return await createVideo.execute(input);
    }

}
