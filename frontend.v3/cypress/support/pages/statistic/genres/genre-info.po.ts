import { InfoListPo } from '../info-list-po';

export class GenreInfoPo extends InfoListPo {
  public constructor(name: string) {
    super(encodeURI(`/genre/${name}`));
  }
}
