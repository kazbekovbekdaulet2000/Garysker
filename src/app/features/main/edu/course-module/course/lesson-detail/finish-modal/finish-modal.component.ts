import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseDetailModel } from '@core/models/api/course.model';
import { RatingsService } from '@core/services/rating.service';
import { ListRatings } from '@core/states/ratings/ratings.actions';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { CourseState } from '../../../course.state';

@Component({
  templateUrl: './finish-modal.component.html',
  styleUrls: ['./finish-modal.component.scss'],
  providers: [
    RatingsService.getProvider('courses')
  ]
})
export class FinishCourseModalComponent implements OnInit {

  onClose!: Subject<boolean | null>;
  @Select(CourseState.course) course$!: Observable<CourseDetailModel>;

  formData = this.formBuilder.group({
    rating: [4, [Validators.max(5), Validators.min(1)]],
    body: ['', Validators.required]
  })

  constructor(
    private store: Store,
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private ratingService: RatingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  onConfirm(): void {
    this.onClose.next(true);
    this.closeModal()
  }

  onCancel(): void {
    this.onClose.next(false);
    this.closeModal()
    this.router.navigate(['edu'])
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  get rating(): number {
    return this.formData.get('rating')?.value
  }

  changeData(rating: number) {
    this.formData.patchValue({ rating })
  }

  sendRating(){
  }

  onPost(){
    const course = this.store.selectSnapshot(CourseState.course)
    this.ratingService.post(course!.id, this.formData.getRawValue()).subscribe(data=>{
      this.store.dispatch(new ListRatings(course!.id))
      this.router.navigate(['edu'])
      this.bsModalRef.hide()
    })
  }
}
