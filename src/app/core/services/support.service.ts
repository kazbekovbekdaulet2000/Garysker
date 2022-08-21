import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { QuestionModel } from '@core/models/api/question.model';

@Injectable({
  providedIn: 'root'
})

export class SupportService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('support');
  }

  listQuestions(params?: any): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.getNoSlashUrl('questions'), { params })
  }

  sendEmail(payload: any): Observable<any> {
    return this.http.post<any>(this.getUrl('email'), payload)
  }
}
