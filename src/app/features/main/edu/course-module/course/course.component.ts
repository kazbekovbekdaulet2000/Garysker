import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CategoriesService } from '@core/services/categories.service';
import { CourseService } from '@core/services/courses.service';

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseComponent implements OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    public courseService: CourseService,
    public categoriesService: CategoriesService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.courseService.init(id)
    })
  }

  changeCategory(id: number = NaN) {
    this.categoriesService.changeCategory(id)
    this.router.navigate(['/edu'])
  }

  ngOnDestroy(): void {
    this.courseService.clear()
  }
}

