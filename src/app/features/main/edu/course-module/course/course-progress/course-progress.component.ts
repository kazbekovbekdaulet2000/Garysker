import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseDetailModel } from '@core/models/api/course.model';
import { LessonDetailModel, LessonModel } from '@core/models/api/lesson.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { RatingModel } from '@core/models/api/rating.model';
import { ListRatings } from '@core/states/ratings/ratings.actions';
import { RatingsState } from '@core/states/ratings/ratings.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GetCourse, GetCourseLesson, GetCourseLessonResources, GetCurrentCourseLesson, ListCourseLessons } from '../../course.actions';
import { CourseState } from '../../course.state';
import { CourseRatingComponent } from './course-rating/course-rating.component';

@Component({
  selector: "app-course-progress",
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseProgressComponent {

  @Select(CourseState.course) course$!: Observable<CourseDetailModel>;
  @Select(CourseState.lesson) lesson$!: Observable<LessonDetailModel>;
  @Select(CourseState.lessons) lessons$!: Observable<ListResponseModel<LessonModel>>;
  @Select(RatingsState.ratings) ratings$!: Observable<ListResponseModel<RatingModel>>;
  courseId!: number
  lessonId!: number
  show_teaser: boolean = false
  ratings: boolean = false
  
  constructor(
    private store: Store,
    private router: Router
  ) {
    this.lesson$.pipe(filter(obj => obj !== null)).subscribe(data => {
      this.show_teaser = !data.course_participation
    })
    this.course$.subscribe(course => {
      this.courseId = course.id
    })
  }

  changeLesson(lesson: LessonModel) {
    this.router.navigate([`edu/courses/${this.courseId}`])
    this.store.dispatch(new GetCourseLesson(this.courseId, lesson.id))
    this.store.dispatch(new GetCourseLessonResources(this.courseId, lesson.id))
  }

  showRatings() {
    this.ratings = !this.ratings
  }
}
