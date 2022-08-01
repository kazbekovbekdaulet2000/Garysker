import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseService } from '@core/services/courses.service';
import { Store } from '@ngxs/store';
import { ChangeCategory } from 'src/app/features/auth/main.actions';

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseComponent implements OnDestroy {

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public courseService: CourseService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.courseService.init(id)
    })
  }

  changeCategory(id?: number) {
    if (id) {
      this.store.dispatch(new ChangeCategory(id))
    } else {
      this.store.dispatch(new ChangeCategory(NaN))
    }
    this.router.navigate(['/edu'])
  }

  ngOnDestroy(): void {
    this.courseService.clear()
  }
}

