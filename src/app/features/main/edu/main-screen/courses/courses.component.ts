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
import { CategoriesService } from '@core/services/categories.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduCousesComponent extends ListAbstract<CourseModel> {
  
  @Select(AuthState.profile) profile$: Observable<UserModel>;

  constructor(
    private router: Router,
    public courseService: CourseService,
    private categoriesService: CategoriesService
  ) {
    super()
  }

  onCourseRoute(id: number) {
    this.router.navigate(['edu/courses', id])
  }

  get listAction(): Observable<ListResponseModel<CourseModel>> {
    return this.categoriesService.selectedCategory$.pipe(switchMap(category => {
      let params = this.params
      if (category) {
        params = { ...params, category }
      }
      return this.courseService.list(params)
    }))
  }
}
