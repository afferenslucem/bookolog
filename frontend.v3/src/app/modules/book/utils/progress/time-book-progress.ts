import { BookProgress } from './book-progress';
import { TimeProgress } from '../../models/time-progress';

export class TimeBookProgress extends BookProgress<TimeProgress> {
  public convertToNumber(value: TimeProgress): number {
    const hours = Number(value?.hours);
    const minutes = Number(value?.minutes);

    return hours * 60 + minutes;
  }

  public convertFromNumber(value: number): TimeProgress {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;

    return {
      hours,
      minutes,
    };
  }
}
