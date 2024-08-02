import Category from "../../../domain/entity/Category";
import CategoryRepository from "../../../domain/repository/CategoryRepository";
import Connection from "../../database/Connection";

export default class CategoryRepositoryDatabase implements CategoryRepository{

    constructor(private connection: Connection){
    }
    
    async findById(id: string): Promise<Category> {
        const [ categoryData ] = await this.connection.execute("select id, description from category where id = $1", [id]);
        return new Category(categoryData.description, categoryData.id);
    }

}