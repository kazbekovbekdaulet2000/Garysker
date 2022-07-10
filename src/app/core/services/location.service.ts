import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { cities_list } from '@core/models/local/cities.list';
import { countries_list } from '@core/models/local/countries.list';
import { NameModel } from '@core/models/name.model';

export interface CountryModel extends NameModel {
  id: number,
  country?: number
}

@Injectable({
  providedIn: 'root'
})
export class LocationService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('');
  }

  list(type: 'countries' | 'cities', params?: any): Observable<NameModel[]> {
    if (type === 'cities') {
      return of(cities_list)
    } else {
      return of(countries_list)
    }
  }
}