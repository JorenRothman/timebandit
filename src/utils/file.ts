import { format } from 'date-fns';
import path from 'path';

export function pathContainsFilename(pathName: string, extension = '.csv') {
    return pathName.endsWith(extension);
}

export function getFilePath(pathName: string) {
    if (pathContainsFilename(pathName)) {
        return pathName;
    }

    return path.resolve(pathName, getGeneratedFileName());
}

export function getGeneratedFileName() {
    const date = new Date();

    const fileName = format(date, 'yyyyMMdd');

    return `${fileName}.csv`;
}
