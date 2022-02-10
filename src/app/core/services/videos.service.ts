import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { environment } from '@env';
import { ListResponseModel } from '@core/models/api/list.model';
import { Store } from '@ngxs/store';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import { CommentModel } from '@core/models/api/comment.model';
import { AuthState } from '@core/states/auth/auth.state';
import { UpdatePopular } from 'src/app/features/main/main.actions';
import getCategoryIcon from '@core/utils/category-icons';

interface ReportList {
  videos: VideoModel[]
}

@Injectable({
  providedIn: 'root'
})

export class VideosService extends ApiService {

  constructor(
    protected http: HttpClient,
    private store: Store
  ) {
    super('edu/videos');
  }

  list(params?: any): Observable<ListResponseModel<VideoModel>> {
    const id = this.store.selectSnapshot(SidebarState.selected_category);
    if (id !== null) {
      params = { category: id }
    }
    return this.http.get<ListResponseModel<VideoModel>>(this.getUrl(), { params }).pipe(
      map(videos => {
        videos.results.forEach(res => {
          res.category_icon = getCategoryIcon(res.category.substring(0, 2))
          res.category = res.category.substring(3)
        })
        
        if (id === null || id === undefined) {
          this.store.dispatch(new UpdatePopular(videos, 'video'))
        }
        return videos
      })
    )
  }

  listSaved(params?: any): Observable<ListResponseModel<VideoModel>> {
    return this.http.get<ListResponseModel<VideoModel>>(this.getUrl('bookmarked'), { params }).pipe(
      map(videos => {
        videos.results.forEach(res => {
          res.category_icon = getCategoryIcon(res.category.substring(0, 2))
          res.category = res.category.substring(3)
        })
        return videos
      })
    )
  }

  get(id: number): Observable<VideoDetailModel> {
    return this.http.get<VideoDetailModel>(this.getUrl(id)).pipe(
      map(video => {
        video.category_icon = getCategoryIcon(video.category.substring(0, 2))
        video.category = video.category.substring(3)
        return video
      })
    )
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

  postComment(id: number, payload: any): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.getUrl(`${id}/comments`), payload)
      .pipe(
        map(res => {
          const owner = this.store.selectSnapshot(AuthState.profile)
          res.owner = owner!
          res.replies = []
          res.created_at = new Date().toISOString()
          return res
        })
      )
  }
}
