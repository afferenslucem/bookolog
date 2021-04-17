import { InfoListPo } from '../info-list-po';

export class TagInfoPo extends InfoListPo {
  public constructor(name: string) {
    super(encodeURI(`/tag/${name}`));
  }
}
