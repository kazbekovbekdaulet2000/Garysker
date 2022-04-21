import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CourseDetailModel } from '@core/models/api/course.model';
import { LessonDetailModel, LessonModel } from '@core/models/api/lesson.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { RatingModel } from '@core/models/api/rating.model';
import { ListRatings } from '@core/states/ratings/ratings.actions';
import { RatingsState } from '@core/states/ratings/ratings.state';
import { Select, Store } from '@ngxs/store';
import { PlyrComponent } from 'ngx-plyr';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { videoI18n } from 'src/app/shared/components/videoplayer/videoplayer.i18n';
import { ChangeCategory } from '../../../main.actions';
import { ClearCourse, ClearLesson, GetCourse, GetCurrentCourseLesson, ListCourseLessons } from '../course.actions';
import { CourseState } from '../course.state';

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [opacityAnimation, heightAnimation]
})
export class CourseComponent implements AfterViewInit, OnDestroy {

  @Select(CourseState.course) course$!: Observable<CourseDetailModel>;
  @Select(CourseState.lesson) lesson$!: Observable<LessonDetailModel>;
  @Select(CourseState.lessons) lessons$!: Observable<ListResponseModel<LessonModel>>;
  @Select(RatingsState.ratings) ratings$!: Observable<ListResponseModel<RatingModel>>;


  @ViewChild(PlyrComponent)
  plyr!: PlyrComponent;
  player!: Plyr;

  videoSources: Plyr.Source[] = [];
  viderQuality!: Plyr.QualityOptions
  videoTracks: Plyr.Track[] = []

  videoOption: Plyr.Options = {
    ratio: "16:9",
    i18n: videoI18n,
    autoplay: false,
    volume: 1,
    fullscreen: {
      enabled: true,
      iosNative: true,
    },
  }

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const id = Number(this.router.url.split('/')[3])
    this.activatedRoute.params.subscribe(({ lessonId }) => {
      this.store.dispatch(new GetCurrentCourseLesson(id))
      this.store.dispatch(new GetCourse(id))
      this.store.dispatch(new ListCourseLessons(id))
      this.store.dispatch(new ListRatings(id))
    })
  }

  ngAfterViewInit(): void {
    this.lesson$.pipe(filter(obj => obj !== null)).subscribe(lesson => {
      this.videoSources = [
        {
          src: lesson.video,
          provider: 'html5'
        }
      ]
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
    this.videoSources = []
    this.store.dispatch([ClearCourse, ClearLesson])
  }

  get rating(): Observable<string> {
    return this.course$.pipe(map(course => {
      if (course.ratings_count == 0) {
        return 'course.rating.no_rating'
      }
      return course.rating > 4 ? 'course.rating.excellent' : (course.rating > 3 ? 'course.rating.good' : 'course.rating.bad')
    }))
  }
}

