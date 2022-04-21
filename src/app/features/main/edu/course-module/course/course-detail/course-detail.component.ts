import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseDetailModel } from '@core/models/api/course.model';
import { CourseService } from '@core/services/courses.service';
import { Select, Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { GetCourse, GetCurrentCourseLesson, ListCourseLessons } from '../../course.actions';
import { CourseState } from '../../course.state';

@Component({
  selector: "app-course-detail",
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseDetailComponent {

  @Select(CourseState.course) course$!: Observable<CourseDetailModel>;

  seletedSection: number = 1
  constructor(
    private store: Store,
    private bsModalService: BsModalService,
    private courseService: CourseService,
    private router: Router
  ) { }

  changeSection(id: number) {
    this.seletedSection = id
  }

  openTest() {
    this.bsModalService.show(MessageModalComponent, {
      initialState: {
        message: "course.test.unavailable",
        icon: 'err_sticker_1'
      },
      class: 'modal-dialog-centered'
    })
  }

  startCourse(course: CourseDetailModel) {
    this.courseService.participate(course.id).toPromise()
      .then(() => {
        const modal = this.bsModalService.show(ConfirmModalComponent, {
          initialState: {
            message: "course.course_access_message",
            false_ans: "course.course_access.back",
            true_ans: "course.course_access.forward",
          },
          class: 'modal-dialog-centered'
        })

        modal.content!.onClose.subscribe(result => {
          if (result === true) {
            this.store.dispatch(new GetCurrentCourseLesson(course.id))
            this.store.dispatch(new GetCourse(course.id))
            this.store.dispatch(new ListCourseLessons(course.id))
          } else {
            this.router.navigate(['/edu'])
          }
        });
      }
      ).catch(err => {
        // TODO
      })
  }
}
