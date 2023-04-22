import sqlite3 from 'sqlite3';
import path from 'path';
import { CONFIG_DIR } from '../constants/paths';
import { DB_NAME } from '../constants/database';
import { Entry } from '../types/database';

const listEntries = () => {
    const db = new sqlite3.Database(path.resolve(CONFIG_DIR, DB_NAME));

    db.serialize(() => {
        db.all('SELECT * FROM times', (err, rows: Entry[]) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            rows.forEach((row: any) => {
                console.log(
                    `${row.id} - ${row.project} - ${row.description} - ${row.start_time} - ${row.end_time} - ${row.duration}`
                );
            });
        });
    });
};

export default listEntries;
