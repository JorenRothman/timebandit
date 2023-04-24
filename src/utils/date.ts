import { format } from 'date-fns';

export function formatDateTime(date: Date) {
    const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

    return format(date, DATE_FORMAT);
}
