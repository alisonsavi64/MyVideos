import Category from "../../src/domain/entity/Category";
import Comments from "../../src/domain/entity/Comments";
import Thumbnail from "../../src/domain/entity/Thumbnail";
import User from "../../src/domain/entity/User";
import Video from "../../src/domain/entity/Video";

test('Deve criar um comentário simples', async function() {
    const comments = new Comments(new User('test@user.com', 'YmrFhsGJ1y', 'Jorge', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c'), "This video it's cool", new Video(new User('test@user.com', 'YmrFhsGJ1y', 'Jorge', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c'), 'myFirstVideo', new Category('Comedy', '046c0ae1-ee82-473b-a341-2c34f6ab3481'), new Thumbnail('img', '6c5fccac-7d4b-495e-ad58-14d5764d357a'), 'test', '58a1e8bb-bc5d-4cf0-aa2a-db6d63dee95f'), 'a6445938-7985-45e2-b0b2-42c9967288c6');
    expect(comments.id).toBe('a6445938-7985-45e2-b0b2-42c9967288c6');
    expect(comments.user.id).toBe('f038dc4c-72e4-4bc5-9c54-7262bf2fd95c');
    expect(comments.description).toBe("This video it's cool")
    expect(comments.video.id).toBe("58a1e8bb-bc5d-4cf0-aa2a-db6d63dee95f");
})

