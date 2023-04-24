import { DB } from '@/constants/database';

async function importBackup(path: string) {
    const { items } = await DB.read(path);

    if (items.length === 0) {
        console.log('No entries found.');
        return;
    }

    items.forEach(async (item) => {
        await DB.update(item);
    });
}

export default importBackup;
