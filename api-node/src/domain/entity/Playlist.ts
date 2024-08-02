import { v4 as uuidv4 } from "uuid";
import User from "./User";
import Video from "./Video";

export default class Playlist{
    private $name: string;
    private $videos: Video[];
    constructor(readonly user: User, name: string, videos: Video[], readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
        this.$name = name
        this.$videos = videos
    }

    get name(): string {
        return this.$name;
    }

    set name(name: string){
        this.$name = name;
    } 

    get videos(): Video[] {
        return this.$videos;
    }

    set videos(videos: Video[]){
        this.$videos = videos;
    } 
}