import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { CommentModel } from '@core/models/api/comment.model';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AuthState } from '@core/states/auth/auth.state';

export type CommentType = 'reports' | 'videos'

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends ApiService {

  constructor(
    protected http: HttpClient,
    protected store: Store
  ) {
    super('edu');
  }

  list(type: CommentType, id: number, params?: any): Observable<ListResponseModel<CommentModel>> {
    return this.http.get<ListResponseModel<CommentModel>>(this.getUrl(`${type}/${id}/comments`), {params});
  }

  post(type: CommentType, id: number, payload: any): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.getUrl(`${type}/${id}/comments`), payload)
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

  like(type: CommentType, id: number, commentId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${type}/${id}/comments/${commentId}/like`), {})
  }

  delete(type: CommentType, id: number, commentid: number): Observable<any> {
    return this.http.delete<any>(this.getUrl(`${type}/${id}/comments/${commentid}`))
  }
}