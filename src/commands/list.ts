import { DB } from '@/constants/database';

async function listEntries() {
    const { items } = await DB.read();

    items.forEach((item) => {
        console.log(
            `${item.id} - ${item.project} - ${item.description} - ${item.startDateTime} - ${item.endDateTime} - ${item.duration}`
        );
    });
}

export default listEntries;
