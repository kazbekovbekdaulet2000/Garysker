import { Injectable } from '@angular/core';
import { TestModel } from '@core/models/api/course-test.model';
import { TestQuestionDetailModel } from '@core/models/api/test-question.model';
import { TestService } from '@core/services/courses-test.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { delay } from 'rxjs/operators';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { GetCourse, GetCourseLesson, GetCurrentCourseLesson, ListCourseLessons } from '../../../course.actions';
import { ClearLessonTest, FinishLessonTest, GetLessonTest, GetLessonTestQuestions, GetLessonTestResult, PostLessonTestQuestionAnwer, ResetLessonTest } from './lesson-test.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';
import { CourseState } from '../../../course.state';
import { FinishCourseModalComponent } from '../finish-modal/finish-modal.component';

interface StateModel {
  test: TestModel | null,
  questions: TestQuestionDetailModel[],
  result: any
}

const defaults = {
  test: null,
  questions: [],
  result: null
};

@State<StateModel>({
  name: 'LessonTest',
  defaults
})
@Injectable()
export class LessonTest {

  @Selector()
  static test({ test }: StateModel): TestModel | null {
    return test;
  }

  @Selector()
  static questions({ questions }: StateModel): TestQuestionDetailModel[] {
    return questions;
  }

  @Selector()
  static result({ result }: StateModel): any {
    return result;
  }

  constructor(
    private store: Store,
    private testService: TestService,
    private bsModalService: BsModalService,
    private router: Router
  ) { }

  @Action(GetLessonTest)
  GetLessonTest({ getState, patchState }: StateContext<StateModel>, { testId }: GetLessonTest) {
    this.testService.get(testId)
      .subscribe(test => {
        if (test.finished) {
          this.store.dispatch(new GetLessonTestResult(testId))
        }
        patchState({ test });
      })
  }

  @Action(GetLessonTestResult)
  GetLessonTestResult({ getState, patchState }: StateContext<StateModel>, { testId }: GetLessonTestResult) {
    this.testService.getResult(testId)
      .subscribe(result => {
        patchState({ result });
      })
  }

  @Action(FinishLessonTest)
  FinishLessonTest({ getState, patchState }: StateContext<StateModel>, { testId }: FinishLessonTest) {
    this.testService.finish(testId).pipe(delay(500)).subscribe(
      result => {
        if (Number(result.percentage.split('%')[0]) > 70) {
          const course = this.store.selectSnapshot(CourseState.course)
          if (course!.lesson_count - course!.closed_lessons !== 1) {
            this.bsModalService.show(MessageModalComponent, {
              initialState: {
                title: `${result.percentage}`,
                message: `course.test.user_point_message`,
                icon: 'err_sticker_1'
              },
              class: 'modal-dialog-centered'
            })
            this.store.dispatch(new GetCourse(course!.id))
            this.store.dispatch(new GetCurrentCourseLesson(course!.id))
            this.store.dispatch(new ListCourseLessons(course!.id))
            this.store.dispatch(new Navigate([`edu/courses/${course!.id}`]))
          } else {
            this.bsModalService.show(FinishCourseModalComponent, {
              class: 'modal-dialog-centered modal-lg',
              ignoreBackdropClick: true
            })
          }
        } else {
          const course = this.store.selectSnapshot(CourseState.course)
          this.bsModalService.show(MessageModalComponent, {
            initialState: {
              message: `course.test.user_point_fail_message`,
              icon: 'err_sticker_2'
            },
            class: 'modal-dialog-centered'
          })
          this.store.dispatch(new GetLessonTest(testId))
          this.store.dispatch(new Navigate([`edu/courses/${course!.id}/test`]))
        }
        patchState({ result });
      },
      err => {
        if (err.status === 400) {
          this.bsModalService.show(MessageModalComponent, {
            initialState: {
              message: `course.test.no_question_answers`,
              icon: 'err_sticker_2'
            },
            class: 'modal-dialog-centered'
          })
        }
      })
  }

  @Action(ResetLessonTest)
  ResetLessonTest({ getState, patchState }: StateContext<StateModel>, { testId }: ResetLessonTest) {
    this.testService.reset(testId).pipe(delay(500)).subscribe(data => {
      this.bsModalService.show(MessageModalComponent, {
        initialState: {
          message: `course.test.results_destroyed`,
          icon: 'err_sticker_1'
        },
        class: 'modal-dialog-centered'
      })
      this.store.dispatch(new GetLessonTest(testId))
      this.store.dispatch(new GetLessonTestQuestions(testId))
    })
  }

  @Action(GetLessonTestQuestions)
  GetLessonTestQuestions({ getState, patchState }: StateContext<StateModel>, { testId }: GetLessonTestQuestions) {
    this.testService.getQuestions(testId)
      .subscribe(questions => {
        patchState({ questions });
      })
  }

  @Action(PostLessonTestQuestionAnwer)
  PostLessonTestQuestionAnwer({ getState, patchState }: StateContext<StateModel>, { testId, questionId, payload }: PostLessonTestQuestionAnwer) {
    this.testService.answer(testId, questionId, payload)
      .subscribe(() => { })
  }


  @Action(ClearLessonTest)
  ClearLessonTest({ patchState }: StateContext<StateModel>) {
    patchState({ test: null })
  }
}
