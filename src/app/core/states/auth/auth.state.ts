import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Login, Logout, PatchUser, RemoveToken, UpdateAvatar, UpdateProfile, UpdateToken } from './actions';

import { TokenModel } from '../../models/api/token.model';
import { IdentityService } from '@core/services/identity.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { UserModel } from '@core/models/api/user.model';


interface AuthStateModel {
  access: string;
  refresh: string;
  profile: UserModel | null;
  accessTokenExpireDate?: Moment | null;
}

const defaults = {
  access: '',
  refresh: '',
  profile: null,
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

  @Selector()
  static profile({ profile }: AuthStateModel): UserModel | null {
    return profile;
  }

  constructor(
    private identityService: IdentityService,
    private store: Store
  ) { }

  @Action(Login)
  Login({ patchState }: StateContext<AuthStateModel>, { token }: Login) {
    const decodedAccessToken = JSON.parse(window.atob(token.access.split('.')[1]));
    patchState({
      access: token.access,
      refresh: token.refresh,
      accessTokenExpireDate: moment.unix(decodedAccessToken.exp)
    });
    this.store.dispatch(UpdateProfile)
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
    patchState({ access: '', refresh: '', profile: null, accessTokenExpireDate: null })
  }

  @Action(UpdateProfile)
  UpdateProfile({ patchState }: StateContext<AuthStateModel>) {
    this.identityService.profile().subscribe(profile => {
      patchState({ profile })
    })
  }

  @Action(PatchUser)
  PatchUser({ patchState }: StateContext<AuthStateModel>, { payload }: PatchUser) {
    this.identityService.update_profile(payload).subscribe(profile => {
      patchState({ profile })
    })
  }

  @Action(UpdateAvatar)
  UpdateAvatar({ patchState }: StateContext<AuthStateModel>, { file }: UpdateAvatar) {
    this.identityService.update_profile_image(file).subscribe(profile => {
      patchState({ profile })
    })
  }
}
