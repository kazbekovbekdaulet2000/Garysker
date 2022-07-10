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
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { AuthState } from '@core/states/auth/auth.state';
import { UserModel } from '@core/models/api/user.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EduCousesComponent {

  @Select(CourseState.courses) courses$!: Observable<ListResponseModel<CourseModel>>;
  @Select(AuthState.profile) profile$!: Observable<UserModel>;

  constructor(
    private store: Store,
    private router: Router,
    private bsService: BsModalService,
  ) { }

  onScroll() {
  }

  onCourseRoute(id: number) {
    this.profile$.subscribe(user => {
      if (user?.is_superuser) {
        this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
        this.router.navigate(['edu/courses', id])
        return
      }
      this.bsService.show(MessageModalComponent, {
        initialState: { message: "Курс пока не доступен" },
        class: 'modal-dialog-centered'
      })
    })
  }
}
