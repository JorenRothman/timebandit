import { DB } from '@/constants/database';
import { formatDateTime } from '@/utils/date';
import { printTable } from 'console-table-printer';

async function listEntries() {
    const { items } = await DB.read();

    const formatted = items.map((item) => {
        const startDateTime = new Date(item.startDateTime);
        const endDateTime = new Date(item.endDateTime);

        return {
            ...item,
            startDateTime: formatDateTime(startDateTime),
            endDateTime: formatDateTime(endDateTime),
        };
    });

    printTable(formatted);
}

export default listEntries;
