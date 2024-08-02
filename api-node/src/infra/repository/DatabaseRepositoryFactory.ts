import IWriteFilesAdapter from "../../domain/adapter/WriteFilesAdapter";
import User from "../../domain/entity/User";
import CategoryRepository from "../../domain/repository/CategoryRepository";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import UserRepository from "../../domain/repository/UserRepository";
import VideoRepository from "../../domain/repository/VideoRepository";
import Connection from "../database/Connection";
import CategoryRepositoryDatabase from "./database/CategoryRepositoryDatabase";
import UserRepositoryDatabase from "./database/UserRepositoryDatabase";
import VideoRepositoryDatabase from "./database/VideoRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory{

    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;
    private videoRepository: VideoRepository;

    constructor(connection: Connection, writeFile: IWriteFilesAdapter){
        this.userRepository = new UserRepositoryDatabase(connection);
        this.categoryRepository = new CategoryRepositoryDatabase(connection);
        this.videoRepository = new VideoRepositoryDatabase(connection, writeFile);

    }

    createUserRepository(): UserRepository{
        return this.userRepository;
    }

    createCategoryRepository(): CategoryRepository{
        return this.categoryRepository;
    }

    createVideoRepository(): VideoRepository{
        return this.videoRepository;
    }

}