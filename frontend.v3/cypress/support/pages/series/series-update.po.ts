import { SeriesFormPo } from './series-form.po';

export class SeriesUpdatePo extends SeriesFormPo {
  public constructor(guid: string) {
    super(`/series/edit/${ guid }`);
  }
}
