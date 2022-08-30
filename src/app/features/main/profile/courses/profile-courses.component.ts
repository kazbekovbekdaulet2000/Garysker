import { Router } from '@angular/router';
import { Select } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '@core/states/auth/auth.state';
import { UserModel } from '@core/models/api/user.model';
import { CourseService } from '@core/services/courses.service';
import { ListAbstract } from '@core/abstract/list.abstract';
import { CourseModel } from '@core/models/api/course.model';
import { ListResponseModel } from '@core/models/api/list.model';


@Component({
  selector: 'app-profile-courses',
  templateUrl: './profile-courses.component.html',
  styleUrls: ['./profile-courses.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class ProfileCoursesComponent extends ListAbstract<CourseModel> {

  @Select(AuthState.profile) profile$: Observable<UserModel>;

  constructor(
    private router: Router,
    public courseService: CourseService,
  ) {
    super()
  }

  onCourseRoute(id: number) {
    this.router.navigate(['edu/courses', id])
  }

  get listAction(): Observable<ListResponseModel<CourseModel>> {
    return this.courseService.listMy(this.params)
  }
}
