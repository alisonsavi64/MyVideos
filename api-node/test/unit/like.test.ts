import Category from "../../src/domain/entity/Category";
import Like from "../../src/domain/entity/Like";
import Thumbnail from "../../src/domain/entity/Thumbnail";
import User from "../../src/domain/entity/User";
import Video from "../../src/domain/entity/Video";

test('Deve criar um like simples', async function() {
    const like = new Like(new User('test@user.com', 'YmrFhsGJ1y', 'Jorge', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c'), new Video(new User('test@user.com', 'YmrFhsGJ1y', 'Jorge', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c'), 'myFirstVideo', new Category('Comedy', '046c0ae1-ee82-473b-a341-2c34f6ab3481'), new Thumbnail('img', '6c5fccac-7d4b-495e-ad58-14d5764d357a'), undefined, '58a1e8bb-bc5d-4cf0-aa2a-db6d63dee95f'), '33b11060-164a-4ed6-83d0-1ec971b95b11');
    expect(like.user.id).toBe('f038dc4c-72e4-4bc5-9c54-7262bf2fd95c');
    expect(like.video.id).toBe('58a1e8bb-bc5d-4cf0-aa2a-db6d63dee95f');
    expect(like.id).toBe('33b11060-164a-4ed6-83d0-1ec971b95b11')
})