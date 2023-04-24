import { differenceInMilliseconds, format } from 'date-fns';
import { keypress } from '@/utils/interaction';
import { DB } from '@/constants/database';
import { Item } from '@/types/database';

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

    const item: Item = {
        id: String(Date.now()),
        project,
        description,
        startDateTime: startTime.toISOString(),
        endDateTime: endTime.toISOString(),
        duration: formattedTime,
    };

    await DB.update(item);

    console.log(`Tracked: ${formattedTime} For ${project}`);

    process.exit(0);
}

export default trackTime;
