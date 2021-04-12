export interface IBookDate {
  year?: number;
  month?: number;
  day?: number;
}

export class BookDate {
  year?: number;
  month?: number;
  day?: number;

  public constructor(obj?: IBookDate) {
    if (obj) {
      this.year = obj.year || null;
      this.month = obj.month || null;
      this.day = obj.day || null;
    } else {
      this.year = null;
      this.month = null;
      this.day = null;
    }
  }
}
