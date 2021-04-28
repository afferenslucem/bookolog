import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public filter$: Subject<string> = new Subject<string>();

  constructor() {}
}
