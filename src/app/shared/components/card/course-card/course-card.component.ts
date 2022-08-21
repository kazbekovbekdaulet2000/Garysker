import { Component, Input } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseModel } from '@core/models/api/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  animations: [opacityAnimation],
})
export class CourseCardComponent {
  @Input() course: CourseModel;
}
