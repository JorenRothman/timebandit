import fs from 'fs';
import os from 'os';
import { DB } from '@/constants/database';
import { getFilePath } from '@/utils/file';

async function exportEntries(pathName: string) {
    const { items } = await DB.read();

    if (items.length === 0) {
        console.log('No entries found.');
        return;
    }

    const headers = 'id,project,description,start_time,end_time,duration';

    const csv = items
        .map((item) => {
            return `${item.id},${item.project},${item.description},${item.startDateTime},${item.endDateTime},${item.duration}`;
        })
        .join(os.EOL);

    const csvWithHeaders = `${headers}${os.EOL}${csv}`;

    const filePath = getFilePath(pathName);

    fs.writeFileSync(filePath, csvWithHeaders, 'utf8');

    console.log(`Exported entries to ${filePath}`);
}

export default exportEntries;
