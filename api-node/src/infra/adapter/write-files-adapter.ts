import { readFile, access, writeFile, rename, readdir, mkdir, lstat, rmdir, unlink } from 'fs/promises';
import { constants } from 'fs';
import path from 'path'
import IWriteFilesAdapter from '../../domain/adapter/WriteFilesAdapter';

export default class WriteFilesAdapter implements IWriteFilesAdapter {

    constructor() {
    }

    public async writeFile(filePath: string, data: Buffer): Promise<Boolean> {
        try {
            await mkdir(path.dirname(filePath), { recursive: true });
            await writeFile(filePath, data);

            return true
        } catch (error) {
            return false
        }
    }

    public async deleteFile(filePath: string) {
        try {
            await unlink(filePath);
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteFolderContents(folderPath: string) {
        try {
            const files = await readdir(folderPath);

            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stat = await lstat(filePath);

                if (stat.isDirectory()) {
                    await this.deleteFolderContents(filePath);
                    await rmdir(filePath);
                } else {
                    await unlink(filePath);
                }
            }
        } catch (err) {
            console.error('Error deleting folder contents:', err);
        }
    }


}
