import fs from 'fs';
import { CONFIG_DIR } from '../constants/paths';
import sqlite3 from 'sqlite3';
import path from 'path';
import os from 'os';
import { DB_NAME } from '../constants/database';
import { Entry } from '../types/database';
import { format } from 'date-fns';

function exportEntries(pathName: string) {
    const db = new sqlite3.Database(path.resolve(CONFIG_DIR, DB_NAME));

    db.serialize(() => {
        db.all('SELECT * FROM times', (err, rows: Entry[]) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            const headers =
                'id,project,description,start_time,end_time,duration';

            const csv = rows
                .map((row) => {
                    return `${row.id},${row.project},${row.description},${row.start_time},${row.end_time},${row.duration}`;
                })
                .join(os.EOL);

            const csvWithHeaders = `${headers}${os.EOL}${csv}`;

            const filePath = getFilePath(pathName);

            fs.writeFileSync(filePath, csvWithHeaders, 'utf8');

            console.log(`Exported entries to ${filePath}`);
        });
    });
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
