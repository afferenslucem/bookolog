export interface BookData {
  guid: string;
  name: string;
  authors?: string[];
  year?: number;
  status: number;
  tags?: string[];
  totalUnits?: number;
  doneUnits?: number;
  genre?: string;
  startDateYear?: number;
  startDateMonth?: number;
  startDateDay?: number;
  startDate?: string;
  endDateYear?: number;
  endDateMonth?: number;
  endDateDay?: number;
  endDate?: string;
  modifyDate: string;
  createDate: string;
  type: number;
  note?: string;
}
