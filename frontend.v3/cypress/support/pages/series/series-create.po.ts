import { SeriesFormPo } from './series-form.po';

export class SeriesCreatePo extends SeriesFormPo {
  public constructor() {
    super('/series/create');
  }
}
