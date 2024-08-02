import { v4 as uuidv4 } from "uuid";
import User from "./User";
import Video from "./Video";

export default class Comments{
    private $description: string;
    private $video: Video;
    constructor(readonly user: User, description: string, video: Video, readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
        this.$description = description
        this.$video = video
    }

    get description(): string {
        return this.$description;
    }

    set description(description: string){
        this.$description = description;
    } 

    get video(): Video {
        return this.$video;
    }

    set video(video: Video){
        this.$video = video;
    } 
}