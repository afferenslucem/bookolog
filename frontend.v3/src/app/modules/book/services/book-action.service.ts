import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookActionService {
  public editAllowed = true;

  constructor() {}
}
