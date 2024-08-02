import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import UserRepository from "../../../domain/repository/UserRepository";
import AccessToken from "../../../domain/entity/AcessToken";
import Video from "../../../domain/entity/Video";
import Category from "../../../domain/entity/Category";
import CategoryRepository from "../../../domain/repository/CategoryRepository";
import VideoRepository from "../../../domain/repository/VideoRepository";
import CreateVideoInput from "./CreateVideoInput";
import CreateVideoOutput from "./CreateVideoOutput";
import Thumbnail from "../../../domain/entity/Thumbnail";

export default class CreateVideo{
    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;
    private videoRepository: VideoRepository;

    constructor(repositoryFactory: RepositoryFactory){
        this.userRepository = repositoryFactory.createUserRepository();
        this.categoryRepository = repositoryFactory.createCategoryRepository();
        this.videoRepository = repositoryFactory.createVideoRepository();
    }

    async execute (input: CreateVideoInput): Promise<CreateVideoOutput> {
        const user = await this.userRepository.findByEmail(input.session.email);
        const category = await this.categoryRepository.findById(input.category);
        let video = new Video(user, input.title, category, new Thumbnail(input.thumbnail), input.media);
        const id = await this.videoRepository.save(video); 
        return {
            id: id
        }        
    }   
}