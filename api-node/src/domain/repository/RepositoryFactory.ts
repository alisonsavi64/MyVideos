import CategoryRepository from "./CategoryRepository";
import UserRepository from "./UserRepository";
import VideoRepository from "./VideoRepository";

export default interface RepositoryFactory {

    createUserRepository(): UserRepository;
    createCategoryRepository(): CategoryRepository;
    createVideoRepository(): VideoRepository;

}
