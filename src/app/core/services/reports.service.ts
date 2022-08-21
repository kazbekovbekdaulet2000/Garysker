import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiService {

  @Select(AppState.lang) lang$!: Observable<LangType>

  _list$: BehaviorSubject<ListResponseModel<ReportModel>> = new BehaviorSubject(emptyListResponse);

  constructor(
    protected http: HttpClient,
  ) {
    super('edu/reports');
  }

  list(params?: any): Observable<ListResponseModel<ReportModel>> {
    return this.lang$.pipe(
      switchMap(lang => {
        params = { ...params, languages: lang }
        return this.http.get<ListResponseModel<ReportModel>>(this.getUrl(), { params }).pipe(
          map(list => {
            list.results = list.results.map(obj => {
              return { ...obj, read_time: moment.duration(obj.read_time).humanize() }
            })
            return list
          }),
          tap(_list => this._list$.next({ ..._list, results: [...this._list$.value.results, ..._list.results] }))
        )
      })
    )
  }

  listSaved(params?: any): Observable<ListResponseModel<ReportModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<ReportModel>>(this.getUrl('bookmarked'), { params }).pipe(map(list => {
        list.results = list.results.map(obj => {
          return { ...obj, read_time: moment.duration(obj.read_time).humanize() }
        })
        return list
      }))
    }))
  }

  get(id: number): Observable<ReportDetailModel> {
    return this.http.get<ReportDetailModel>(this.getUrl(id)).pipe(map(obj => {
      return { ...obj, read_time: moment.duration(obj.read_time).humanize() }
    }))
  }

  getRelated(id: number, params?: any): Observable<ListResponseModel<ReportModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<ReportModel>>(this.getUrl(`${id}/related`), { params }).pipe(map(list => {
        list.results = list.results.map(obj => {
          return { ...obj, read_time: moment.duration(obj.read_time).humanize() }
        })
        return list
      }))
    }))
  }

  like(id: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${id}/like`), {})
  }

  save(id: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${id}/save`), {})
  }

  clear() {
    this._list$.next(emptyListResponse)
  }
}
