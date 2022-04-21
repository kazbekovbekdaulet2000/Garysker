import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ListResponseModel } from '@core/models/api/list.model';
import { RatingModel } from '@core/models/api/rating.model';
import { RatingsState } from '@core/states/ratings/ratings.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: "app-course-progress-rating",
  templateUrl: './course-rating.component.html',
  styleUrls: ['./course-rating.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseRatingComponent {

  @Select(RatingsState.ratings) ratings$!: Observable<ListResponseModel<RatingModel>>;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  formData = this.formBuilder.group({
    text: []
  })

  sendRating(){
    
  }
}
