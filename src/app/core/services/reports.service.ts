import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { CommentModel } from '@core/models/api/comment.model';
import { AuthState } from '@core/states/auth/auth.state';
import getCategoryIcon from '@core/utils/category-icons';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiService {

  constructor(
    protected http: HttpClient,
    private store: Store
  ) {
    super('edu/reports');
  }

  list(params?: any): Observable<ListResponseModel<ReportModel>> {
    return this.http.get<ListResponseModel<ReportModel>>(this.getUrl(), { params }).pipe(
      map(reports => {
        reports.results.forEach(res => {
          res.category_icon = getCategoryIcon(res.category.substring(0, 2))
          res.category = res.category.substring(3)
        })
        return reports
      })
    )
  }

  listSaved(params?: any): Observable<ListResponseModel<ReportModel>> {
    return this.http.get<ListResponseModel<ReportModel>>(this.getUrl('bookmarked'), { params }).pipe(
      map(reports => {
        reports.results.forEach(res => {
          res.category_icon = getCategoryIcon(res.category.substring(0, 2))
          res.category = res.category.substring(3)
        })
        return reports
      })
    )
  }

  get(id: number): Observable<ReportDetailModel> {
    return this.http.get<ReportDetailModel>(this.getUrl(id))
      .pipe(
        map(res => {
          res.icon = getCategoryIcon(res.category.substring(0, 2))
          res.category = res.category.substring(3)
          return res
        })
      )
  }

  getRelated(id: number, params?: any): Observable<ListResponseModel<ReportModel>> {
    return this.http.get<ListResponseModel<ReportModel>>(this.getUrl(`${id}/related`), { params })
      .pipe(
        map(reports => {
          reports.results.forEach(res => {
            res.category_icon = getCategoryIcon(res.category.substring(0, 2))
            res.category = res.category.substring(3)
          })
          return reports
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

  likeComment(reportId: number, id: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${reportId}/comments/${id}/like`), {})
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
