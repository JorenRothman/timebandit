import fs from 'fs';
import path from 'path';
import os from 'os';
import { format } from 'date-fns';
import { DB } from '@/constants/database';

async function exportEntries(pathName: string) {
    const { items } = await DB.read();

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

function pathContainsFilename(pathName: string) {
    return pathName.endsWith('.csv');
}

function getFilePath(pathName: string) {
    if (pathContainsFilename(pathName)) {
        return pathName;
    }

    return path.resolve(pathName, getGeneratedFileName());
}

function getGeneratedFileName() {
    const date = new Date();

    const fileName = format(date, 'yyyyMMdd');

    return `${fileName}.csv`;
}

export default exportEntries;
