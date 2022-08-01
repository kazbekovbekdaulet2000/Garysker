import { Router } from '@angular/router';
import { Select } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '@core/states/auth/auth.state';
import { UserModel } from '@core/models/api/user.model';
import { CourseService } from '@core/services/courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduCousesComponent {
  
  @Select(AuthState.profile) profile$: Observable<UserModel>;

  constructor(
    private router: Router,
    public courseService: CourseService,
  ) {}

  onCourseRoute(id: number) {
    this.router.navigate(['edu/courses', id])
  }
}
