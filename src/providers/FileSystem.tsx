// create a new file in the root of the CONFIG DIR
// Update the file with the new data
// Read the file from the root of the CONFIG DIR
// delete the file from the root of the CONFIG DIR

import fs from 'fs/promises';
import { DB_NAME } from '@/constants/database';
import { FileStructure, Item } from '@/types/database';
import { CONFIG_DIR } from '@/constants/paths';

class FileSystem {
    FULL_PATH = CONFIG_DIR + '/' + DB_NAME;

    async exists(): Promise<boolean> {
        try {
            await fs.access(this.FULL_PATH);
            return true;
        } catch (error) {
            return false;
        }
    }

    async create() {
        // create a new file in the root of the CONFIG DIR if it doesn't exist
        if (await this.exists()) {
            return;
        }

        const data = JSON.stringify(this.generateFileStructure());

        await fs.writeFile(this.FULL_PATH, data);
    }

    async update(data: Item) {
        // Update the file with the new data
        const currentData = await this.read();

        currentData.items.push(data);

        await fs.writeFile(this.FULL_PATH, JSON.stringify(currentData));
    }

    async read(): Promise<FileStructure> {
        // Read the file from the root of the CONFIG DIR
        const data = await fs.readFile(this.FULL_PATH, 'utf8');
        return JSON.parse(data);
    }

    async delete() {
        // delete the file from the root of the CONFIG DIR
        await fs.unlink(this.FULL_PATH);
    }

    generateFileStructure(): FileStructure {
        return {
            items: [],
        };
    }
}

export default FileSystem;
