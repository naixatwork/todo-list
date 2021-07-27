import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ListFacade } from '#modules/task/list/list.facade';
import { first, map, tap } from 'rxjs/operators';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private readonly listFacade: ListFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.listFacade.getMainList().pipe(
      tap((response) => {
        console.log('GUARD CALLED');
        this.router.navigate([`/task/${response.id}`]).then();
      }),
      map((response) => !!response),
      first()
    );
  }
}
