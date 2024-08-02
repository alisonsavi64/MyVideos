import { v4 as uuidv4 } from "uuid";

export default class Thumbnail{
    private $image?: Buffer
    constructor(image?: Buffer, readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
        this.$image = image
    }

    get image(): Buffer | undefined {
        return this.$image;
    }

    set image(image: Buffer){
        this.$image = image;
    } 
}