import { Injectable } from '@angular/core';
import { TestModel } from '@core/models/api/course-test.model';
import { CourseDetailModel, CourseModel } from '@core/models/api/course.model';
import { LessonResourceModel } from '@core/models/api/lesson-resource.model';
import { LessonDetailModel, LessonModel } from '@core/models/api/lesson.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { TestService } from '@core/services/courses-test.service';
import { CourseService } from '@core/services/courses.service';
import { RatingsService } from '@core/services/rating.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { ClearCourse, ClearCourseList, ClearLesson, GetCourse, GetCourseLesson, GetCourseLessonResources, GetCurrentCourseLesson, GetLessonTest, ListCourseLessons, ListCourses } from './course.actions';

interface StateModel {
  courses: ListResponseModel<CourseModel>;
  lesson_list: ListResponseModel<LessonModel>;
  resourses: LessonResourceModel[];
  course: CourseDetailModel | null;
  lesson: LessonDetailModel | null;
  test: TestModel | null;
}

const defaults = {
  courses: emptyListResponse,
  lesson_list: emptyListResponse,
  resourses: [],
  course: null,
  lesson: null,
  test: null
};

@State<StateModel>({
  name: 'Course',
  defaults
})
@Injectable()
export class CourseState {

  @Selector()
  static courses({ courses }: StateModel): ListResponseModel<CourseModel> {
    return courses;
  }

  @Selector()
  static course({ course }: StateModel): CourseDetailModel | null {
    return course;
  }

  @Selector()
  static lessons({ lesson_list }: StateModel): ListResponseModel<LessonModel> {
    return lesson_list;
  }

  @Selector()
  static lesson({ lesson }: StateModel): LessonDetailModel | null {
    return lesson;
  }

  @Selector()
  static test({ test }: StateModel): TestModel | null {
    return test;
  }

  @Selector()
  static resourses({ resourses }: StateModel): LessonResourceModel[] {
    return resourses;
  }

  constructor(
    private store: Store,
    private courseService: CourseService,
    private ratingService: RatingsService,
    private bsModalService: BsModalService,
    private testService: TestService
  ) { }

  @Action(ListCourses)
  ListCourses({ getState, patchState }: StateContext<StateModel>, { params }: ListCourses) {
    this.courseService.list(params)
      .subscribe(courses => {
        patchState({ courses });
      })
  }

  @Action(GetCourse)
  GetCourse({ patchState }: StateContext<StateModel>, { courseId }: GetCourse) {
    this.courseService.get(courseId)
      .subscribe(course => {
        patchState({ course });
        if (course.closed_lessons === course.lesson_count) {
          this.bsModalService.show(MessageModalComponent, {
            initialState: {
              message: `course.finish.finished`,
              icon: 'err_sticker_2'
            },
            class: 'modal-dialog-centered'
          })
        }
      })
  }

  @Action(ListCourseLessons)
  ListCourseLessons({ patchState }: StateContext<StateModel>, { courseId }: ListCourseLessons) {
    this.courseService.listLessons(courseId)
      .subscribe(lesson_list => {
        patchState({ lesson_list });
      })
  }


  @Action(GetCourseLesson)
  GetCourseLesson({ patchState }: StateContext<StateModel>, { courseId, lessonId }: GetCourseLesson) {
    this.courseService.getLesson(courseId, lessonId)
      .subscribe(lesson => {
        patchState({ lesson });
      })
  }

  @Action(GetLessonTest)
  GetLessonTest({ patchState }: StateContext<StateModel>, { testId }: GetLessonTest) {
    this.testService.get(testId)
      .subscribe(test => {
        patchState({ test });
      })
  }

  @Action(GetCurrentCourseLesson)
  GetCurrentCourseLesson({ patchState }: StateContext<StateModel>, { courseId }: GetCurrentCourseLesson) {
    this.courseService.getCurrentLesson(courseId)
      .subscribe(lesson => {
        patchState({ lesson });
        this.store.dispatch(new GetCourseLessonResources(courseId, lesson.id))
      })
  }

  @Action(GetCourseLessonResources)
  GetCourseLessonResources({ patchState }: StateContext<StateModel>, { courseId, lessonId }: GetCourseLessonResources) {
    this.courseService.getResources(courseId, lessonId)
      .subscribe(resourses => {
        patchState({ resourses });
      })
  }

  @Action(ClearCourse)
  ClearCourse({ patchState }: StateContext<StateModel>) {
    patchState({ course: null })
  }

  @Action(ClearLesson)
  ClearLesson({ patchState }: StateContext<StateModel>) {
    patchState({ course: null })
  }

  @Action(ClearCourseList)
  ClearCourseList({ patchState }: StateContext<StateModel>) {
    patchState({ courses: emptyListResponse })
  }
}
