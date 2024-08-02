import { v4 as uuidv4 } from "uuid";
import User from "./User";
import Video from "./Video";

export default class Like{
    private $video: Video;
    constructor(readonly user: User, video: Video, readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
        this.$video = video
    }

    get video(): Video {
        return this.$video;
    }

    set video(video: Video){
        this.$video = video;
    } 
}