export default interface IWriteFilesAdapter {

    writeFile(filePath: string, data: Buffer): Promise<Boolean>;
    deleteFile(filePath: string): void;
    deleteFolderContents(folderPath: string): void;

}
