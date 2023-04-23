import { differenceInMilliseconds, format } from 'date-fns';
import { keypress } from '@/utils/interaction';
import { DB } from '@/constants/database';

async function trackTime(project: string, description: string) {
    console.log(
        `Starting a new time entry for ${project} with description ${description}`
    );

    const startTime = new Date();

    console.log('Press any key to stop the time entry');
    await keypress();

    const endTime = new Date();

    const duration = differenceInMilliseconds(endTime, startTime);

    // format duration date to HH:MM:SS
    const hours = Math.floor(duration / 1000 / 60 / 60);
    const minutes = Math.floor((duration / 1000 / 60 / 60 - hours) * 60);
    const seconds = Math.floor(
        ((duration / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );

    const formattedTime = format(
        new Date(0, 0, 0, hours, minutes, seconds),
        'HH:mm:ss'
    );

    DB.serialize(() => {
        DB.prepare(
            `CREATE TABLE IF NOT EXISTS times (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project TEXT NOT NULL,
                    description TEXT NOT NULL,
                    start_time TEXT NOT NULL,
                    end_time TEXT NOT NULL,
                    duration INTEGER NOT NULL
                )`
        ).run();

        DB.prepare('INSERT INTO times VALUES (?, ?, ?, ?, ?, ?)')
            .run(
                null,
                project,
                description,
                startTime.toISOString(),
                endTime.toISOString(),
                formattedTime
            )
            .finalize(function () {
                process.exit();
            });
    });

    console.log(`Tracked: ${formattedTime} For ${project}`);
}

export default trackTime;
