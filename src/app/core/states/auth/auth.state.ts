import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Login, Logout, RemoveToken, UpdateToken } from './actions';

import { TokenModel } from '../../models/api/token.model';
import { IdentityService } from '@core/services/identity.service';
import { Moment } from 'moment';
import * as moment from 'moment';


interface AuthStateModel {
  access: string;
  refresh: string;
  accessTokenExpireDate?: Moment | null;
}

const defaults = {
  access: '',
  refresh: '',
  accessTokenExpireDate: null,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {

  @Selector()
  static accessTokenExpireDate({ accessTokenExpireDate }: AuthStateModel): Moment | null | undefined {
    return accessTokenExpireDate;
  }

  @Selector()
  static access({ access }: AuthStateModel): string {
    return access;
  }

  constructor(
    private store: Store,
    private identityService: IdentityService,
  ) {
  }

  @Action(Login)
  Login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.identityService.login(payload)
      .toPromise()
      .then(token => {
        const decodedAccessToken = JSON.parse(window.atob(token.access.split('.')[1]));
        return patchState({
          access: token.access,
          refresh: token.refresh,
          accessTokenExpireDate: moment.unix(decodedAccessToken.exp)
        });
      })
  }

  @Action(UpdateToken)
  UpdateToken({ patchState }: StateContext<AuthStateModel>, { access }: UpdateToken) {
    const decodedAccessToken = JSON.parse(window.atob(access.split('.')[1]));
    return patchState({
      access: access,
      accessTokenExpireDate: moment.unix(decodedAccessToken.exp)
    });
  }

  @Action(RemoveToken)
  RemoveToken({ patchState }: StateContext<AuthStateModel>) {
    patchState({ access: '', refresh: '', accessTokenExpireDate: null})
    this.store.dispatch(new Navigate(['/']))
  }
}
