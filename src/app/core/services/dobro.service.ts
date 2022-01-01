import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';

@Injectable({
  providedIn: 'root'
})

export class DobroService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('dobro');
  }

  list(params?: any): Observable<DobroProjectModel[]> {
    return this.http.get<DobroProjectModel[]>(this.noSlashUrl('projects'), { params })
  }

  get(id: number, params?: any): Observable<DobroProjectModel> {
    return this.http.get<DobroProjectModel>(this.noSlashUrl(`project_detail/${id}`), {params})
  }

}
