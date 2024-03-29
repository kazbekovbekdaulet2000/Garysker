import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { CommentModel } from '@core/models/api/comment.model';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AuthState } from '@core/states/auth/auth.state';

@Injectable()
export class CommentsService extends ApiService {

  static getProvider(type: 'reports' | 'videos') {
    return {
      provide: CommentsService,
      deps: [HttpClient, Store],
      useFactory: (http, store) => {
        return new CommentsService(http, store, type);
      }
    };
  }

  constructor(
    protected http: HttpClient,
    protected store: Store,
    @Inject(String) public type: string,
  ) {
    super(`edu/${type}`)
  }

  list(id: number, params?: any): Observable<ListResponseModel<CommentModel>> {
    return this.http.get<ListResponseModel<CommentModel>>(this.getUrl(`${id}/comments`), { params });
  }

  post(id: number, payload: any): Observable<CommentModel> {
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

  patch(id: number, commentId: number, payload: any): Observable<CommentModel> {
    return this.http.patch<CommentModel>(this.getUrl(`${id}/comments/${commentId}`), payload)
  }

  like(id: number, commentId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${id}/comments/${commentId}/like`), {})
  }

  delete(id: number, commentid: number): Observable<any> {
    return this.http.delete<any>(this.getUrl(`${id}/comments/${commentid}`))
  }
}