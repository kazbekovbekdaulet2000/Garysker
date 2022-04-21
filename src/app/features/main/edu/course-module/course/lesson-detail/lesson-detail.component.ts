import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { LessonResourceModel } from '@core/models/api/lesson-resource.model';
import { LessonDetailModel } from '@core/models/api/lesson.model';
import { CourseService } from '@core/services/courses.service';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { GetCourse, GetCourseLesson, GetCourseLessonResources, GetCurrentCourseLesson, ListCourseLessons } from '../../course.actions';
import { CourseState } from '../../course.state';
import { FinishCourseModalComponent } from './finish-modal/finish-modal.component';

@Component({
  selector: "app-course-lesson-detail",
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class LessonDetailComponent {

  @Select(CourseState.lesson) lesson$!: Observable<LessonDetailModel>;
  @Select(CourseState.resourses) resourses$!: Observable<LessonResourceModel[]>;

  courseId: number = NaN
  seletedSection: number = 1

  constructor(
    private store: Store,
    private router: Router,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private bsModalService: BsModalService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = Number(params.id)
    })
  }

  changeSection(id: number) {
    this.seletedSection = id
    if (!this.getTest) {
      this.router.navigate([`${this.router.url.split('/test')[0]}`])
    }
  }

  openTest() {
    this.router.navigate([`${this.router.url}/test`])
  }

  passLesson() {
    const course = this.store.selectSnapshot(CourseState.course)
    const lesson = this.store.selectSnapshot(CourseState.lesson)
    if (lesson!.order < course!.closed_lessons) {
      this.store.select(CourseState.lessons).subscribe(lessons => {
        const obj = lessons.results.find((obj: any) => obj.order === lesson!.order + 1)
        this.store.dispatch(new GetCourseLesson(this.courseId, obj!.id))
        this.store.dispatch(new GetCourseLessonResources(this.courseId, obj!.id))
      })
    } else if (lesson!.order !== course!.closed_lessons) {
      this.courseService.nextLesson(this.courseId).pipe(delay(500)).subscribe(() => {
        if (course!.lesson_count - course!.closed_lessons !== 1) {
          const modal = this.bsModalService.show(ConfirmModalComponent, {
            initialState: {
              icon: "err_sticker_2",
              message: "course.lesson.access_message",
              true_ans: "course.lesson.access_ans",
            },
            class: 'modal-dialog-centered'
          })

          modal.content!.onClose.subscribe(result => {
            if (result === true) {
              this.updateInfo(this.courseId)
            }
          });
        } else {
          this.bsModalService.show(FinishCourseModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            ignoreBackdropClick: true
          })
        }
      })
    }


  }

  updateInfo(id: number) {
    this.store.dispatch(new GetCourse(id))
    this.store.dispatch(new GetCurrentCourseLesson(id))
    this.store.dispatch(new ListCourseLessons(id))
  }

  get getTest(): boolean {
    return !this.router.url.includes('test')
  }

  get lastLesson(): Observable<boolean> {
    return this.store.select(CourseState.course).pipe(map(course => {
      if (course) {
        return course.lesson_count - course.closed_lessons === 1
      }
      return false
    }))
  }
}
