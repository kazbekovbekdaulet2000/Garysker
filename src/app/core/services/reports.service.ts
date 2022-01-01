import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ReportModel } from '@core/models/api/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('edu');
  }

  list(params?: any): Observable<ReportModel[]> {
    return this.http.get<ReportModel[]>(this.noSlashUrl('reports'), { params })
  }

}
