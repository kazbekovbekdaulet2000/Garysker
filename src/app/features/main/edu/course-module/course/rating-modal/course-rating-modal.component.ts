import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { RatingsService } from '@core/services/rating.service';

@Component({
  templateUrl: './course-rating-modal.component.html',
  styleUrls: ['./course-rating-modal.component.scss'],
  animations: [opacityAnimation],
  providers: [RatingsService.getProvider('courses')]
})
export class CourseRatingModalModalComponent {

  courseId: number;
  rating: number = 5;
  body: string = '';

  constructor(
    private bsModalRef: BsModalRef,
    private ratingsService: RatingsService
  ) { }

  onSubmit(): void {
    if (this.body !== '') {
      const payload = { body: this.body, rating: this.rating }
      this.ratingsService.post(this.courseId, payload).subscribe(data => {
        this.closeModal()
      })
    }
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  triggerFunction(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.body = this.body + '\n'
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
