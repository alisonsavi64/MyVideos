import Playlist from "../../src/domain/entity/Playlist";
import User from "../../src/domain/entity/User";

test('Deve criar uma playlist simples', async function() {
    const playlist = new Playlist(new User('test@user.com', 'YmrFhsGJ1y', 'Jorge', 'f038dc4c-72e4-4bc5-9c54-7262bf2fd95c'), 'myFavoriteVideos', [], '8f47635c-9139-4041-b812-50e0dc2beb94');
    expect(playlist.id).toBe('8f47635c-9139-4041-b812-50e0dc2beb94');
    expect(playlist.user.id).toBe('f038dc4c-72e4-4bc5-9c54-7262bf2fd95c');
    expect(playlist.name).toBe('myFavoriteVideos');
    expect(playlist.videos).toHaveLength(0);
})

