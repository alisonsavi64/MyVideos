import Category from "../entity/Category";

export default interface CategoryRepository {

    findById(id: string): Promise<Category>;

}
