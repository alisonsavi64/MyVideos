import User from "../../src/domain/entity/User";
import UserRepository from "../../src/domain/repository/UserRepository";
import MemoryRepositoryFactory from "../../src/infra/repository/MemoryRepositoryFactory";

let memoryRepositoryFactory: MemoryRepositoryFactory;
let userRepository: UserRepository;

beforeEach(function () {
    memoryRepositoryFactory = new MemoryRepositoryFactory();
    userRepository = memoryRepositoryFactory.createUserRepository();
});

test.skip("Deve criar um usuário no repositório", async function () {
    let user = new User('test@user.com', 'YmrFhsGJ1y', 'Jorge', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c')
    user = await userRepository.save(user);
    expect(user.email).toBe('test@user.com');
    expect(user.id).toBe('f038dc4c-72e4-4bc5-9c54-7262bf2fd95c');
    expect(user.nickname).toBe('Jorge');
});
