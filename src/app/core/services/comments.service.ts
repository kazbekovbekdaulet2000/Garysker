import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { CommentModel } from '@core/models/api/comment.model';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AuthState } from '@core/states/auth/auth.state';


@Injectable({
  providedIn: 'any'
})
export class CommentService extends ApiService {
  constructor(
    protected http: HttpClient,
    private store: Store
  ) {
    super('');
  }

  listComments(id: number, type?: string): Observable<ListResponseModel<CommentModel>> {
    return this.http.get<any>(this.getUrl(`${type}/${id}/comments`));
  }

  postComment(id: number, payload: any, type?: string): Observable<CommentModel> {
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

  likeComment(id: number, commentId: number, type?: string): Observable<any> {
    return this.http.post<any>(this.getUrl(`${type}/${id}/comments/${commentId}/like`), {})
  }
}