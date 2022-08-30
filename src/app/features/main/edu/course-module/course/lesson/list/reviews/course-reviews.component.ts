import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListAbstract } from '@core/abstract/list.abstract';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReviewModel } from '@core/models/api/review.model';
import { CourseService } from '@core/services/courses.service';
import { ModalService } from '@core/services/modal.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseReviewsListComponent extends ListAbstract<ReviewModel> {
  
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService
  ) { 
    super();
  }

  get listAction(): Observable<ListResponseModel<ReviewModel>> {
    return this.activatedRoute.params.pipe(switchMap(route=>{
      return this.courseService.listReviews(+route.id)
    }))
  }
}

