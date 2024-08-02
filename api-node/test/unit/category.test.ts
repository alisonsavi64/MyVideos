import Category from "../../src/domain/entity/Category";

test('Deve criar uma categoria simples', async function() {
    const category = new Category('Comedy', '046c0ae1-ee82-473b-a341-2c34f6ab3481');
    expect(category.id).toBe('046c0ae1-ee82-473b-a341-2c34f6ab3481');
    expect(category.description).toBe('Comedy');
})