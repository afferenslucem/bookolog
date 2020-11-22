import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { getLogger } from '../../../main/app.logging';

export enum Action {
  Create = 'create',
  Edit = 'edit',
}

@Injectable({providedIn: 'root'})
export class ActionResolver implements Resolve<Action> {
  private logger = getLogger({
    loggerName: 'ActionResolver',
    namespace: 'Resolver',
  });

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Action> | Promise<Action> | Action {
    const action = route.paramMap.get('action');

    this.logger.debug('action result: ', action);

    return action as Action;
  }
}
