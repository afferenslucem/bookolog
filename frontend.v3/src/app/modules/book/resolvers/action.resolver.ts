import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getLogger } from '../../../main/app.logging';

export enum Action {
  Create = 'create',
  Edit = 'edit',
}
