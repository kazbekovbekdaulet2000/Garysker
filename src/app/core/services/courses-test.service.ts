import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TestModel } from '@core/models/api/course-test.model';
import { TestQuestionDetailModel } from '@core/models/api/test-question.model';
import { map } from 'rxjs/operators';
import { TestResultModel } from '@core/models/api/test-result.model';

export interface AnswerModel {
  selected_answer: number
}

@Injectable({
  providedIn: 'root'
})

export class TestService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('tests');
  }

  get(testId: number): Observable<TestModel> {
    return this.http.get<TestModel>(this.getUrl(testId))
  }

  getResult(testId: number): Observable<TestResultModel> {
    return this.http.get<TestResultModel>(this.getUrl(`${testId}/result`), {})
  }

  finish(testId: number): Observable<TestResultModel> {
    return this.http.post<TestResultModel>(this.getUrl(`${testId}/finish`), {})
  }

  reset(testId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${testId}/reset`), {})
  }

  getQuestions(testId: number): Observable<TestQuestionDetailModel[]> {
    return this.http.get<TestQuestionDetailModel[]>(this.getUrl(`${testId}/questions`)).pipe(
      map(vals => {
        return vals.map((obj, i) => { return { ...obj, ...{ index: i + 1 } } })
      })
    )
  }

  answer(testId: number, questionId: number, answer: AnswerModel): Observable<AnswerModel> {
    return this.http.post<AnswerModel>(this.getUrl(`${testId}/questions/${questionId}`), answer)
  }
}
