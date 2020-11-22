import addMinutes from 'date-fns/addMinutes';

export class DateUtils {
  public static get nowUTC(): Date {
    const now = this.now;

    return addMinutes(now, now.getTimezoneOffset());
  }

  public static get now(): Date {
    return new Date();
  }
}
