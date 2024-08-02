import Thumbnail from "../../src/domain/entity/Thumbnail";

test('Deve criar uma thumbnail simples', async function() {
    const thumbnail = new Thumbnail('img', '6c5fccac-7d4b-495e-ad58-14d5764d357a');
    expect(thumbnail.id).toBe('6c5fccac-7d4b-495e-ad58-14d5764d357a');
    expect(thumbnail.image).toBe('img');
})