import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UpdateProfile } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Store } from '@ngxs/store';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AuthState.access)) {
      this.store.dispatch([UpdateProfile]);
      this.router.navigate(['/edu'])
      return false;
    }
    return true;
  }
}