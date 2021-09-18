import { InfoListPo } from '../info-list-po';

export class AuthorsInfoPo extends InfoListPo {
  public constructor(name: string) {
    super(encodeURI(`/author/${ name }`));
  }
}
