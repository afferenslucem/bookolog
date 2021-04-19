export interface IBook {
  name: string;
  authors?: string[];
  year?: number;
  genre?: string;
  tags?: string[];
  type?: string;
  status?: string;
  series?: string;
  progressType?: string;
  doneUnits?: number;
  totalUnits?: number;
  startDay?: number;
  startMonth?: number;
  startYear?: number;
  finishDay?: number;
  finishMonth?: number;
  finishYear?: number;
  notes?: string;
}
