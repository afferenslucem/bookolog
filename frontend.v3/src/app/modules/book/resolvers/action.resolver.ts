import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
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

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Action> {
    // const action = route.get('action');
    //
    // this.logger.debug('action result: ', action);
    //
    // return action as Action;

    return null;
  }
}
