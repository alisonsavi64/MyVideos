import User from "../../src/domain/entity/User";

test('Deve criar um usuário simples', async function() {
    const user = new User('test@user.com', 'YmrFhsGJ1y', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c');
    expect(user.email).toBe('test@user.com');
    expect(user.password).toBe('YmrFhsGJ1y');
})