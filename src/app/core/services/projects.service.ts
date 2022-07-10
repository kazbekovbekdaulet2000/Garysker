import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { ProjectDetailModel, ProjectModel } from '@core/models/api/projects.model';

@Injectable()
export class ProjectsService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('projects');
  }

  list(params?: any): Observable<ListResponseModel<ProjectModel>> {
    return this.http.get<ListResponseModel<ProjectModel>>(this.getUrl(), { params })
  }

  get(id: number): Observable<ProjectDetailModel> {
    return this.http.get<ProjectDetailModel>(this.getUrl(id))
  }
}
