export interface IBook {
  name: string;
  authors?: string[];
  year?: number;
  genre?: string;
  tags?: string[];
  type?: string;
  progressType?: string;
  doneUnits?: number;
  totalUnits?: number;
  startDay?: number;
  startMonth?: number;
  startYear?: number;
  notes?: string;
}
