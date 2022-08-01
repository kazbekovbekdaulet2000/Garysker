import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ListResponseModel } from '@core/models/api/list.model';
import { CourseDetailModel, CourseModel } from '@core/models/api/course.model';
import { LessonDetailModel, LessonModel } from '@core/models/api/lesson.model';
import { LessonResourceModel } from '@core/models/api/lesson-resource.model';
import { tap } from 'rxjs/operators';
import { QuizModel } from '@core/models/api/quiz.model';
import { LectorDetailModel } from '@core/models/api/lector.model';
import { AnswerModel, QuestionDetailModel, QuestionModel, QuizAttemptModel } from '@core/models/api/question.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CourseService extends ApiService {
  courses: ListResponseModel<CourseModel>;
  course: CourseDetailModel;
  lessons: LessonModel[];
  lectors: LectorDetailModel[]
  lesson: LessonDetailModel;
  quiz: QuizModel;

  questions: QuestionModel[];
  question: QuestionDetailModel;
  attempt: QuizAttemptModel;

  inited: boolean = false;

  constructor(
    protected http: HttpClient,
    private router: Router
  ) {
    super('courses');
  }

  init(courseId: number) {
    this.get(courseId).subscribe(course => {
      this.course = course

      combineLatest([
        this.listLessons(this.course.id),
        this.listLectors(this.course.id)
      ]).subscribe({ complete: () => this.inited = true })

      if (this.course.participant) {
        this.getCurrentLesson(this.course.id).subscribe(lesson => {
          this.lesson = lesson
          if (this.lesson.quiz) {
            this.getQuiz(this.course.id, this.lesson.id).subscribe({
              next: () => { },
              error: () => {
                this.quiz = null
                this.questions = []
                if (this.router.url.includes('quiz')) {
                  this.router.navigate(['edu/courses', this.course.id])
                }
              },
              complete: () => {
                this.inited = true
              }
            })
          }
        })
      }
    })
  }

  navigateMain() {
    if (this.router.url.includes('quiz')) {
      this.router.navigate(['edu/courses', this.course.id])
    }
  }

  list(params?: any): Observable<ListResponseModel<CourseModel>> {
    return this.http.get<ListResponseModel<CourseModel>>(this.getUrl(), { params }).pipe(tap(courses=>{
      this.courses=courses
    }))
  }

  get(courseId: number): Observable<CourseDetailModel> {
    return this.http.get<CourseDetailModel>(this.getUrl(courseId)).pipe(tap(course => this.course = course))
  }

  participate(courseId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${courseId}/participate`), {})
  }

  listLessons(courseId: number): Observable<LessonModel[]> {
    return this.http.get<LessonModel[]>(this.getUrl(`${courseId}/lessons`)).pipe(tap(lessons => this.lessons = lessons))
  }

  listLectors(courseId: number): Observable<LectorDetailModel[]> {
    return this.http.get<LectorDetailModel[]>(this.getUrl(`${courseId}/lectors`)).pipe(tap(lectors => this.lectors = lectors))
  }

  nextLesson(courseId: number): Observable<any> {
    return this.http.post<any>(this.getUrl(`${courseId}/lessons/next_lesson`), {})
  }

  getLesson(courseId: number, lessonId: number): Observable<LessonDetailModel> {
    return this.http.get<LessonDetailModel>(this.getUrl(`${courseId}/lessons/${lessonId}`)).pipe(tap(lesson => this.lesson = lesson))
  }

  getQuiz(courseId: number, lessonId: number): Observable<QuizModel> {
    return this.http.get<QuizModel>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz`)).pipe(tap(quiz => this.quiz = quiz))
  }

  getCurrentLesson(courseId: number): Observable<LessonDetailModel> {
    return this.http.get<LessonDetailModel>(this.getUrl(`${courseId}/lessons/current`)).pipe(tap(lesson => this.lesson = lesson))
  }

  getResources(courseId: number, lessonId: number): Observable<LessonResourceModel[]> {
    return this.http.get<LessonResourceModel[]>(this.getUrl(`${courseId}/lessons/${lessonId}/resources`))
  }

  listSaved(params?: any): Observable<ListResponseModel<CourseModel>> {
    return this.http.get<ListResponseModel<CourseModel>>(this.getUrl('my'), { params })
  }

  // Questions

  startQuiz(courseId: number, lessonId: number): Observable<QuizAttemptModel> {
    return this.http.post<QuizAttemptModel>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/start`), {}).pipe(
      tap(attempt => this.attempt = attempt)
    )
  }

  getCurrentQuiz(courseId: number, lessonId: number): Observable<QuizAttemptModel> {
    return this.http.get<QuizAttemptModel>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/current`), {}).pipe(
      tap(attempt => this.attempt = attempt)
    )
  }

  listQuestions(courseId: number, lessonId: number, params?: any): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/questions`), { params }).pipe(
      tap(questions => this.questions = questions)
    )
  }

  getQuestion(courseId: number, lessonId: number, id: number): Observable<QuestionDetailModel> {
    return this.http.get<QuestionDetailModel>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/questions/${id}`)).pipe(
      tap(question => this.question = question)
    )
  }

  getQuestionAnswers(courseId: number, lessonId: number, id: number): Observable<any[]> {
    return this.http.get<any[]>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/questions/${id}/answer`))
  }

  answerQuestion(courseId: number, lessonId: number, id: number, payload: any): Observable<any> {
    return this.http.post<any>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/questions/${id}/answer`), payload)
  }

  finishQuiz(courseId: number, lessonId: number): Observable<QuizAttemptModel> {
    return this.http.post<QuizAttemptModel>(this.getUrl(`${courseId}/lessons/${lessonId}/quiz/finish`), {})
  }

  clear() {
    this.lesson = null;
    this.lessons = [];
    this.course = null;
    this.inited = false
  }
}
