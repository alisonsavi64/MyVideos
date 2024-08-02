import { v4 as uuidv4 } from "uuid";

export default class Category{
    private $description: string
    constructor(description: string, readonly id?: string){
        if (!id) id = uuidv4();
        this.id = id;
        this.$description = description
    }

    get description(): string {
        return this.$description;
    }

    set description(description: string){
        this.$description = description;
    } 
}