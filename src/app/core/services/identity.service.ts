import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TokenModel} from '../models/api/token.model';
import { ApiService } from './api.service';
import { UserModel } from '@core/models/api/user.model';


@Injectable({
  providedIn: 'root'
})

export class IdentityService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('auth');
  }

  login(payload: any): Observable<TokenModel> {
    return this.http.post<TokenModel>(this.getUrl('login'), payload);
  }

  signup(payload: any): Observable<any> {
    return this.http.post<any>(this.getUrl('signup'), payload);
  }

  refresh(refresh: string): Observable<TokenModel> {
    return this.http.post<TokenModel>(this.getUrl('refresh'), {refresh}, {params: {refresh_token: true}});
  }

  profile(): Observable<UserModel> {
    return this.http.get<UserModel>(this.getUrl('profile'))
  }

  update_profile(payload: any): Observable<UserModel> {
    return this.http.patch<UserModel>(this.getUrl('profile'), payload)
  }
}
