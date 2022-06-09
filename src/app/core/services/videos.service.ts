import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map, switchMap } from 'rxjs/operators';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { Select, Store } from '@ngxs/store';
import { CommentModel } from '@core/models/api/comment.model';
import { AuthState } from '@core/states/auth/auth.state';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';

@Injectable({
  providedIn: 'root'
})

export class VideosService extends ApiService {

  @Select(AppState.lang) lang$!: Observable<LangType>

  constructor(
    protected http: HttpClient,
    private store: Store
  ) {
    super('edu/videos');
  }

  list(params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<VideoModel>>(this.getUrl(), { params })
    }))
  }

  listSaved(params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<VideoModel>>(this.getUrl('bookmarked'), { params })
    }))
  }

  get(id: number): Observable<VideoDetailModel> {
    return this.http.get<VideoDetailModel>(this.getUrl(id))
  }

  getRelated(id: number, params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.lang$.pipe(switchMap(lang => {
      params = { ...params, languages: lang }
      return this.http.get<ListResponseModel<VideoModel>>(this.getUrl(`${id}/related`), { params })
    }))
  }

  like(id: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${id}/like`), {})
  }

  save(id: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${id}/save`), {})
  }

  listComments(id: number, params?: any): Observable<ListResponseModel<CommentModel>> {
    return this.http.get<ListResponseModel<CommentModel>>(this.getUrl(`${id}/comments`), { params })
  }

  likeComment(videoId: number, id: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${videoId}/comments/${id}/like`), {})
  }

  deleteComment(videoId: number, id: number): Observable<any> {
    return this.http.delete<any>(this.getUrl(`${videoId}/comments/${id}`), {})
  }

  postComment(id: number, payload: any): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.getUrl(`${id}/comments`), payload)
      .pipe(
        map(res => {
          const owner = this.store.selectSnapshot(AuthState.profile)
          res.owner = owner!
          res.replies = []
          res.created_at = new Date().toISOString()
          res.updated_at = new Date().toISOString()
          res.liked = false
          res.likes_count = 0
          return res
        })
      )
  }
}
