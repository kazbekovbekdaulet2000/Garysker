import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { TestModel, TestQuestionModel } from '@core/models/api/course-test.model';
import { CourseDetailModel } from '@core/models/api/course.model';
import { LessonDetailModel } from '@core/models/api/lesson.model';
import { TestQuestionDetailModel } from '@core/models/api/test-question.model';
import { TestService } from '@core/services/courses-test.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { CourseState } from '../../../course.state';
import { FinishLessonTest, GetLessonTest, GetLessonTestQuestions, ResetLessonTest } from './lesson-test.actions';
import { LessonTest } from './lesson-test.state';

interface TestQuestionModelIndex extends TestQuestionModel {
  index: number
}

export interface TestQuestionDetailModelIndex extends TestQuestionDetailModel {
  index: number
}

@Component({
  selector: "app-lesson-test",
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonTestComponent implements AfterViewInit {

  @Select(CourseState.lesson) lesson$!: Observable<LessonDetailModel>;
  @Select(CourseState.course) course$!: Observable<CourseDetailModel>;
  @Select(LessonTest.test) test$!: Observable<TestModel>;
  @Select(LessonTest.questions) questions$!: Observable<TestQuestionDetailModel[]>;
  @Select(LessonTest.result) result$!: Observable<any>;


  testId: number = NaN

  @ViewChild('test') testElement!: ElementRef
  seletedSection: number = 1

  question: TestQuestionDetailModel | undefined

  constructor(
    private store: Store,
  ) {
    this.lesson$.pipe(take(1)).subscribe(lesson => {
      if (lesson.test_id) {
        this.testId = lesson.test_id
        this.store.dispatch(new GetLessonTest(lesson.test_id))
        this.store.dispatch(new GetLessonTestQuestions(lesson.test_id))
      }
    })
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 200)
    this.getQuestions()
  }

  getQuestions(id?: number) {
    this.questions$.pipe(filter(obj => obj !== (null || undefined))).subscribe(data => {
      this.question = id ? data.find(val => val.id === id) : (data.find(val => val.user_answer === null) || data[0])
    })
  }

  next() {
    this.questions$.pipe(filter(obj => obj !== (null || undefined))).subscribe(data => {
      if (this.question) {
        const index = this.question.index
        this.question = data.find(val => val.index === index! + 1) || data.find(val => val.index === index!)
      }
    })
  }

  finish() {
    this.store.dispatch(new FinishLessonTest(this.testId))
  }

  resetTest() {
    this.store.dispatch(new ResetLessonTest(this.testId))
  }

  changeSection(id: number) {
    this.seletedSection = id
  }
}
