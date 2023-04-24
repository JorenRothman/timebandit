import { DB } from '@/constants/database';

async function backup(path: string) {
    const { items } = await DB.read();

    if (items.length === 0) {
        console.log('No entries found.');
        return;
    }

    await DB.copy(path);
}

export default backup;
