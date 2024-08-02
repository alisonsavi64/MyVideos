import User from "../../../domain/entity/User";

export default interface CreateVideoInput {

    media: Buffer;
    title: string;
    category: string;
    session: User;
    thumbnail: Buffer;

}
