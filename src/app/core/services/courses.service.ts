import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { CourseDetailModel, CourseModel } from '@core/models/api/course.model';
import { LessonDetailModel, LessonModel } from '@core/models/api/lesson.model';
import { LessonResourceModel } from '@core/models/api/lesson-resource.model';
import { TestModel } from '@core/models/api/course-test.model';

@Injectable({
  providedIn: 'root'
})

export class CourseService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('courses');
  }

  list(params?: any): Observable<ListResponseModel<CourseModel>> {
    return this.http.get<ListResponseModel<CourseModel>>(this.getUrl(), { params })
  }

  get(courseId: number): Observable<CourseDetailModel> {
    return this.http.get<CourseDetailModel>(this.getUrl(courseId))
  }

  participate(courseId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${courseId}/participate`), {})
  }

  listLessons(courseId: number): Observable<ListResponseModel<LessonModel>> {
    return this.http.get<ListResponseModel<LessonModel>>(this.getUrl(`${courseId}/lessons`))
  }

  nextLesson(courseId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${courseId}/lessons/next`), {})
  }

  getLesson(courseId: number, lessonId: number): Observable<LessonDetailModel> {
    return this.http.get<LessonDetailModel>(this.getUrl(`${courseId}/lessons/${lessonId}`))
  }

  getCurrentLesson(courseId: number): Observable<LessonDetailModel> {
    return this.http.get<LessonDetailModel>(this.getUrl(`${courseId}/lessons/current`))
  }

  getResources(courseId: number, lessonId: number): Observable<LessonResourceModel[]> {
    return this.http.get<LessonResourceModel[]>(this.getUrl(`${courseId}/lessons/${lessonId}/resources`))
  }

  listSaved(params?: any): Observable<ListResponseModel<CourseModel>> {
    return this.http.get<ListResponseModel<CourseModel>>(this.getUrl('my'), { params })
  }
}
