import addMinutes from 'date-fns/addMinutes';
import {BookDate} from '../../modules/book/models/book-date';

export class DateUtils {
  public static get nowUTC(): Date {
    const now = this.now;

    return addMinutes(now, now.getTimezoneOffset());
  }

  public static get now(): Date {
    return new Date();
  }

  public static get today(): BookDate {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
  }
}
