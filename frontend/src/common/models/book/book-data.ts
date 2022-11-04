import { ProgressAlgorithmType } from "./progress/progress-algorithm-type";

export interface BookData {
    guid: string;
    modifyDate: string | Date;
    createDate: string | Date;
    name: string;
    authors?: string[];
    year?: number;
    status: number;
    tags?: string[];
    totalUnits?: number;
    doneUnits?: number;
    genre?: string;
    collectionGuid?: string;
    collectionOrder?: number;
    startDateYear?: number;
    startDateMonth?: number;
    startDateDay?: number;
    startDate?: string;
    endDateYear?: number;
    endDateMonth?: number;
    endDateDay?: number;
    endDate?: string;
    type: number;
    note?: string;
    progressType?: ProgressAlgorithmType;
    rereadingBookGuid?: string;
    rereadedBy?: string[];
}
