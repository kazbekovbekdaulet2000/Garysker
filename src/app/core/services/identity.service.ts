import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TokenModel} from '../models/api/token.model';
import { ApiService } from './api.service';


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
}
