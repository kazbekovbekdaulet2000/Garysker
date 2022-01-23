import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ReportDetailModel, ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { SidebarState } from '@core/states/sidebar/sidebar.state';
import { CommentModel } from '@core/models/api/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiService {

  constructor(
    protected http: HttpClient,
    private store: Store
  ) {
    super('edu');
  }

  list(params?: any): Observable<ListResponseModel<ReportModel>> {
    const id = this.store.selectSnapshot(SidebarState.selected_category);
    if (id !== null) {
      params = { category: id }
    }
    return this.http.get<ListResponseModel<ReportModel>>(this.getUrl('reports'), { params })
  }

  get(id: number): Observable<ReportDetailModel> {
    return this.http.get<ReportDetailModel>(this.getUrl(`reports/${id}`))
      .pipe(
        map(res => {
          res.icon = res.category.substring(0, 2)
          res.category = res.category.substring(3)
          return res
        })
      )
  }

  listComments(id: number, params?: any): Observable<ListResponseModel<CommentModel>> {
    return this.http.get<ListResponseModel<CommentModel>>(this.getUrl(`reports/${id}/comments`), { params })
  }

  postComment(id: number, payload: any): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.getUrl(`reports/${id}/comments`), payload)
  }

}
