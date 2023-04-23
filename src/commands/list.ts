import { DB } from '@/constants/database';
import { Entry } from '@/types/database';

const listEntries = () => {
    DB.serialize(() => {
        DB.all('SELECT * FROM times', (err, rows: Entry[]) => {
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
