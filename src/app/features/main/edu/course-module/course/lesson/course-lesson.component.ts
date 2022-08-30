import { Component, Input } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { LessonDetailModel } from '@core/models/api/lesson.model';
import { CourseService } from '@core/services/courses.service';

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLessonComponent {

  @Input() lesson: LessonDetailModel;

  constructor(
    public courseService: CourseService,
  ) { }

  onVideoEnd(){
    console.log('lesson finished')
  }
}

