import { ProgressAlgorithmType } from "./progress/progress-algorithm-type";

export interface BookData {
    guid: string;
    modifyDate: string | Date;
    createDate: string | Date;
    name: string;
    authors?: string[];
    year?: number | null;
    status: number;
    tags?: string[];
    totalUnits?: number;
    doneUnits?: number;
    genre?: string | null;
    collectionGuid?: string;
    collectionOrder?: number;
    startDateYear?: number | null;
    startDateMonth?: number | null;
    startDateDay?: number | null;
    endDateYear?: number | null;
    endDateMonth?: number | null;
    endDateDay?: number | null;
    type: number;
    note?: string;
    progressType?: ProgressAlgorithmType;
    rereadingBookGuid?: string;
    rereadedBy?: string[];
}
