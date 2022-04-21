import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoModel } from '@core/models/api/video.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import * as moment from 'moment';
import { CourseModel } from '@core/models/api/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  animations: [opacityAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class CourseCardComponent implements OnInit {

  @Input() course!: CourseModel;

  ngOnInit(): void {
    if (this.course.image === null) {
      this.course.image = 'https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    }
  }

  getTime(duriation: string) {
    return moment.duration(duriation).asMilliseconds()
  }
}
