import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import * as moment from 'moment';
import { Moment } from 'moment';

import { Login, Logout, RemoveToken, UpdateToken } from './actions';

import { TokenModel } from '../../models/api/token.model';
import { IdentityService } from '@core/services/identity.service';


interface AuthStateModel {
  token: TokenModel | null;
}

const defaults = {
  token: null,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {

  @Selector()
  static token({ token }: AuthStateModel): TokenModel | null {
    return token;
  }

  constructor(
    private store: Store,
    private identityService: IdentityService,
  ) {
  }

  @Action(Login)
  Login({ patchState }: StateContext<AuthStateModel>, { token }: Login) {
    return patchState({ token });
  }
}
