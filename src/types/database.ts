export interface Entry {
    id: number;
    project: string;
    description: string;
    start_time: string;
    end_time: string;
    duration: string;
}

export type Item = {
    id: string;
    project: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    duration: string;
};

export type FileStructure = {
    items: Item[];
};
