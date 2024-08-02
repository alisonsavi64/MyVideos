import IWriteFilesAdapter from "../../../domain/adapter/WriteFilesAdapter";
import Video from "../../../domain/entity/Video";
import VideoRepository from "../../../domain/repository/VideoRepository";
import Connection from "../../database/Connection";

export default class VideoRepositoryDatabase implements VideoRepository{

    constructor(private connection: Connection, private writeFile: IWriteFilesAdapter){
    }
    
    async save(video: Video): Promise<string> {
        await this.connection.execute("insert into videos (id, title, category, thumbnail_id, user_id) values ($1, $2, $3, $4, $5)", [video.id, video.title, video.category.id, (video.thumbnail.image ? video.thumbnail.id : undefined), video.user.id]);
        if(!await this.writeFile.writeFile(`./storage/videos/${video.category.id}/${video.user.id}/${video.id}`, video.media!))
        if(video.thumbnail){
            await this.writeFile.writeFile(`./storage/thumbnails/${video.category.id}/${video.user.id}/${video.id}/${video.thumbnail.id}`, video.media!)
        }

        return video.id!;
    }

}