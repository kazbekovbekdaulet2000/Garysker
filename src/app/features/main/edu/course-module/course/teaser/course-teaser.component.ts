import { Component } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseDetailModel, CourseModel } from '@core/models/api/course.model';
import { CourseService } from '@core/services/courses.service';
import { ModalService } from '@core/services/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-course-teaser',
  templateUrl: './course-teaser.component.html',
  styleUrls: ['./course-teaser.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseTeaserComponent {
  constructor(
    public courseService: CourseService,
    public bsService: BsModalService,
    public modalService: ModalService
  ) { }

  participateCourse(course: CourseModel | CourseDetailModel) {
    this.courseService.participate(course.id).subscribe(() => {
      this.modalService.showDialog({
        title: '',
        message: 'course.teaser.course_access_message',
        iconType: 'hello',
        position: 'center',
        onConfirm: ()=>{
          this.courseService.init(course.id)
        }
      })
    })
  }
}

