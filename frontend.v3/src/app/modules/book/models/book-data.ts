import { IDeletable } from 'src/app/main/models/i-deletable';
import { IEntity } from 'src/app/main/models/i-entity';
import { IUpdatable } from 'src/app/main/models/i-updatable';

export interface BookData extends IDeletable, IUpdatable, IEntity {
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
}
