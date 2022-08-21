import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { Select } from '@ngxs/store';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class VideosService extends ApiService {

  @Select(AppState.lang) lang$: Observable<LangType>
  _list$: BehaviorSubject<ListResponseModel<VideoModel>> = new BehaviorSubject(emptyListResponse);

  constructor(
    protected http: HttpClient
  ) {
    super('edu/videos');
  }

  list(params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<VideoModel>>(this.getUrl(), { params }).pipe(
        map(list => {
          list.results = list.results.map(obj => {
            return { ...obj, duriation: moment.duration(obj.duriation).humanize() }
          })
          return list
        }),
        tap(_list => this._list$.next({ ..._list, results: [...this._list$.value.results, ..._list.results] }))
      )
    }))
  }

  listSaved(params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<VideoModel>>(this.getUrl('bookmarked'), { params }).pipe(
        map(list => {
          list.results = list.results.map(obj => {
            return { ...obj, duriation: moment.duration(obj.duriation).humanize() }
          })
          return list
        })
      )
    }))
  }

  get(id: number): Observable<VideoDetailModel> {
    return this.http.get<VideoDetailModel>(this.getUrl(id)).pipe(
      map(obj => {
        return { ...obj, duriation: moment.duration(obj.duriation).humanize() }
      })
    )
  }

  getRelated(id: number, params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<VideoModel>>(this.getUrl(`${id}/related`), { params }).pipe(
        map(list => {
          list.results = list.results.map(obj => {
            return { ...obj, duriation: moment.duration(obj.duriation).humanize() }
          })
          return list
        })
      )
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
