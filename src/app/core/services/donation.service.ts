import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('payment/donate');
  }

  fetch(payload: any): Observable<any> {
    return this.http.post<any>(this.getUrl(), payload)
  }
}
