import { Component } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseDetailModel, CourseModel } from '@core/models/api/course.model';
import { CourseService } from '@core/services/courses.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  selector: 'app-course-teaser',
  templateUrl: './course-teaser.component.html',
  styleUrls: ['./course-teaser.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseTeaserComponent {
  constructor(
    public courseService: CourseService,
    public bsService: BsModalService
  ) { }

  participateCourse(course: CourseModel | CourseDetailModel) {
    this.courseService.participate(course.id).subscribe(() => {
      this.bsService.show(MessageModalComponent, {
        initialState: {
          message: 'course.teaser.course_access_message',
          icon: 'sticker3'
        },
        class: 'modal-dialog-centered'
      })
      this.courseService.init(course.id)
    })
  }
}

