import Category from "../../src/domain/entity/Category";
import Thumbnail from "../../src/domain/entity/Thumbnail";
import User from "../../src/domain/entity/User";
import Video from "../../src/domain/entity/Video";

test('Deve criar um video simples', async function() {
    const video = new Video(new User('test@user.com', 'YmrFhsGJ1y', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c'), 'myFirstVideo', new Category('Comedy', '046c0ae1-ee82-473b-a341-2c34f6ab3481'), new Thumbnail('img', '6c5fccac-7d4b-495e-ad58-14d5764d357a'), 'test', '58a1e8bb-bc5d-4cf0-aa2a-db6d63dee95f');
    expect(video.id).toBe('58a1e8bb-bc5d-4cf0-aa2a-db6d63dee95f');
    expect(video.title).toBe('myFirstVideo');
    expect(video.category.id).toBe('046c0ae1-ee82-473b-a341-2c34f6ab3481');
    expect(video.thumbnail.id).toBe('6c5fccac-7d4b-495e-ad58-14d5764d357a');
    expect(video.thumbnail.image).toBe('img');
})