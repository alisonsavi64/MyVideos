import { v4 as uuidv4 } from "uuid";
import Category from "./Category";
import Thumbnail from "./Thumbnail";
import User from "./User";

export default class Video{
    private $title: string;
    private $category: Category;
    private $thumbnail: Thumbnail
    constructor(readonly user: User, title: string, category: Category, thumbnail: Thumbnail, readonly media?: Buffer | undefined,readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
        this.$title = title
        this.$category = category
        this.$thumbnail = thumbnail
    }

    get title(): string {
        return this.$title;
    }

    set title(title: string){
        this.$title = title;
    } 

    get category(): Category {
        return this.$category;
    }

    set category(category: Category){
        this.$category = category;
    } 

    get thumbnail(): Thumbnail {
        return this.$thumbnail;
    }

    set thumbnail(thumbnail: Thumbnail){
        this.$thumbnail = thumbnail;
    }
}