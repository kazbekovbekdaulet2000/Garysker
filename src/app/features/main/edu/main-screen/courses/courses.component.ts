import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store'
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { UpdateTop } from '@core/states/scroll/scroll';
import { CourseModel } from '@core/models/api/course.model';
import { CourseState } from '../../course-module/course.state';
import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EduCousesComponent {

  @Select(CourseState.courses) courses$!: Observable<ListResponseModel<CourseModel>>;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onScroll() {
    // this.store.dispatch(ListMoreReports)
  }

  onCourseRoute(id: number) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    this.router.navigate(['edu/courses', id])
  }
}
