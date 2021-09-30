import { Injectable } from '@angular/core';
import { MetrikaEvent } from '../models/metrikaEvent';
import metrika from '../utils/metrika';

@Injectable()
export class MetrikaService {
  constructor() {}

  public fireBookCreate(): void {
    this.fireEvent(MetrikaEvent.BookCreate);
  }

  public fireBookUpdate(): void {
    this.fireEvent(MetrikaEvent.BookUpdate);
  }

  public fireBookDelete(): void {
    this.fireEvent(MetrikaEvent.BookDelete);
  }

  public fireCollectionCreate(): void {
    this.fireEvent(MetrikaEvent.CollectionCreate);
  }

  public fireCollectionUpdate(): void {
    this.fireEvent(MetrikaEvent.CollectionUpdate);
  }

  public fireCollectionDelete(): void {
    this.fireEvent(MetrikaEvent.CollectionDelete);
  }

  public fireEvent(eventName: MetrikaEvent): void {
    metrika.native(eventName);
  }
}
