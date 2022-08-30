import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { RatingsService } from '@core/services/rating.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './course-rating-modal.component.html',
  styleUrls: ['./course-rating-modal.component.scss'],
  animations: [opacityAnimation],
  providers: [RatingsService.getProvider('courses')]
})
export class CourseRatingModalModalComponent {

  courseId: number;
  rating: number;
  body: string;

  constructor(
    private bsModalRef: BsModalRef,
    private ratingsService: RatingsService,
    private routerService: Router
  ) { }

  onSubmit(): void {
    if (this.rating) {
      let payload = { rating: this.rating }
      if (this.body) {
        payload = { ...payload, ...{ body: this.body } }
      }
      this.ratingsService.post(this.courseId, payload).subscribe(() => {
        this.closeModal()
      })
    }
  }

  closeModal() {
    this.bsModalRef.hide()
    this.routerService.navigate(['/edu'])
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
